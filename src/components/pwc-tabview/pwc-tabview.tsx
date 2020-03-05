import {
  Component,
  h,
  Element,
  Listen,
  Event,
  EventEmitter,
  Method,
  Watch,
  Prop
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

  @Prop({ reflect: true, mutable: true }) activeTitle: string;
  @Watch("activeTitle")
  activeTitleWatchHandler(newValue, oldValue) {
    this.parseTabList();

    if (!this.titles.includes(newValue)) {
      // tslint:disable-next-line: no-console
      console.error(
        `Active title not found! Refusing to update. Requested activeTitle: '${newValue}' Old activeTitle: '${oldValue}' All titles: '${this.titles}'`
      );

      if (!this.titles.includes(oldValue)) {
        // tslint:disable-next-line: no-console
        console.error(
          `Old title is not there anymore. Refusing to revert. Requested activeTitle: '${newValue}' Old activeTitle: '${oldValue}' All titles: '${this.titles}'`
        );
      } else {
        this.activeTitle = oldValue;
      }
    } else {
      this.tabChanged.emit({
        title: newValue,
        tab: this.titleToTabMap[newValue],
        handle: this.titleToHandleMap[newValue]
      });
    }
  }

  /**
   * This is emitted when we switch to another tab.
   */
  @Event() tabChanged: EventEmitter<IState>;

  @Listen("tabModified")
  tabModifiedEventHandler() {
    this.parseTabList();
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
      tab: this.titleToTabMap[this.activeTitle],
      handle: this.titleToHandleMap[this.activeTitle]
    };
  }

  /**
   * Switches to a tab.
   * @param title Title of the target tab.
   */
  @Method()
  async switchToTab(title: string) {
    this.activeTitle = title;
  }

  /**
   * Switches to a tab.
   * @param index Index of the target tab.
   */
  @Method()
  async switchToTabIndex(index: number) {
    const title = this.titles[index];
    return this.switchToTab(title);
  }

  onChildrenChange() {
    this.parseTabList();
    this.root.forceUpdate();
  }

  parseTabList() {
    this.tabRefs = Array.from(this.root.querySelectorAll("pwc-tabview-tab"));
    this.titles = this.tabRefs.map(t => t.title);

    this.titleToTabMap = {};
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

  async componentWillRender() {
    // refresh internal bookkeeping
    this.parseTabList();

    // if the active title doesn't exist, switch to the first tab (if it exists)
    if (!this.titles.includes(this.activeTitle) && this.titles.length > 0) {
      await this.switchToTabIndex(0);
    }

    // set all tabs inactive
    this.tabRefs.forEach(t => (t.active = false));

    // set the active tab active
    if (this.titleToTabMap.hasOwnProperty(this.activeTitle)) {
      this.titleToTabMap[this.activeTitle].active = true;
    }

    // flush the handle map
    this.titleToHandleMap = {};
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
}
