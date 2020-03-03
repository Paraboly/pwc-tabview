import {
  Component,
  h,
  Element,
  Listen,
  State,
  Event,
  EventEmitter,
  Method,
  Watch
} from "@stencil/core";
import { IHandleClickedEventPayload } from "../pwc-tabview-handle/IHandleClickedEventPayload";
import { IState } from "./IState";

@Component({
  tag: "pwc-tabview",
  styleUrl: "pwc-tabview.scss",
  shadow: false
})
export class PwcTabview {
  @Element() root: HTMLPwcTabviewElement;

  private tabRefs: HTMLPwcTabviewTabElement[] = [];
  private titleToTabMap: { [key: string]: HTMLPwcTabviewTabElement } = {};
  private titleToHandleMap: { [key: string]: HTMLPwcTabviewHandleElement } = {};
  private titles: string[] = [];

  private activeTab: HTMLPwcTabviewTabElement;
  private activeHandle: HTMLPwcTabviewHandleElement;

  @State() activeTitle: string;
  @Watch("activeTitle")
  activeTitleWatchHandler(newValue: string) {
    this.activeTab = this.titleToTabMap[newValue];
    this.activeHandle = this.titleToHandleMap[newValue];
  }

  /**
   * This is emitted when we switch to another tab.
   */
  @Event() tabChanged: EventEmitter<IState>;

  @Listen("tabModified")
  tabModifiedEventHandler() {
    this.root.forceUpdate();
  }

  @Listen("handleClicked")
  handleClickedHandler(event: CustomEvent<IHandleClickedEventPayload>) {
    const title = event.detail.title;
    this.switchToTab(title);
  }

  /**
   * Returns the currently active tab, handle, and title.
   */
  @Method()
  async getActiveState(): Promise<IState> {
    return {
      title: this.activeTitle,
      tab: this.activeTab,
      handle: this.activeHandle
    };
  }

  /**
   * Switches to a tab.
   * @param title Title of the target tab.
   */
  @Method()
  async switchToTab(title: string) {
    if (!this.titles.includes(title)) {
      throw new Error("Tab title not found.");
    }

    this.activeTitle = title;

    this.tabChanged.emit({
      title,
      tab: this.activeTab,
      handle: this.activeHandle
    });
  }

  /**
   * Switches to a tab.
   * @param index Index of the target tab.
   */
  @Method()
  async switchToTabIndex(index: number) {
    if (this.titles.length <= index || index < 0) {
      throw new Error("Tab index not found.");
    }

    const title = this.titles[index];
    return this.switchToTab(title);
  }

  onChildrenChange() {
    this.root.forceUpdate();
  }

  parseTabList() {
    this.tabRefs = Array.from(this.root.querySelectorAll("pwc-tabview-tab"));
    this.titles = this.tabRefs.map(t => t.title);
    this.tabRefs.forEach(t => {
      this.titleToTabMap[t.title] = t;
    });
  }

  componentDidLoad() {
    const observer = new MutationObserver(this.onChildrenChange.bind(this));
    const options = {
      childList: true
    };
    observer.observe(this.root, options);
  }

  componentWillRender() {
    this.parseTabList();

    this.tabRefs.forEach(t => (t.active = false));
    if (this.activeTab) {
      this.activeTab.active = true;
    }
  }

  render() {
    return [
      <div class="pwc-tabview___handle-container">
        {this.tabRefs.map(tab => {
          return (
            <pwc-tabview-handle
              key={tab.title}
              title={tab.title}
              active={this.activeTitle === tab.title}
              ref={elem => (this.titleToHandleMap[tab.title] = elem)}
            ></pwc-tabview-handle>
          );
        })}
      </div>,
      <slot />
    ];
  }

  componentDidRender() {
    if (!this.titles.includes(this.activeTitle) && this.titles.length > 0) {
      this.switchToTabIndex(0);
    }
  }
}
