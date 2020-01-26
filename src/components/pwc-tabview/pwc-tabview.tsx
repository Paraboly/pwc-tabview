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
  private activeTab: HTMLPwcTabviewTabElement;
  private activeHandle: HTMLPwcTabviewHandleElement;

  private titles: string[] = [];
  private tabs: { [key: string]: HTMLPwcTabviewTabElement } = {};
  private handles: { [key: string]: HTMLPwcTabviewHandleElement } = {};

  @Element() root: HTMLPwcTabviewElement;

  @State() activeTitle: string;
  @Watch("activeTitle")
  activeTitleWatchHandler(newValue: string) {
    this.activeTab = this.tabs[newValue];
    this.activeHandle = this.handles[newValue];
  }

  /**
   * This is emitted when we switch to another tab.
   */
  @Event() tabChanged: EventEmitter<IState>;

  @Listen("tabModified")
  tabModifiedEventHandler() {
    this.forceRender();
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
    this.activeTitle = title;

    this.tabChanged.emit({
      title,
      tab: this.activeTab,
      handle: this.activeHandle
    });
  }

  // The value has no significance. We increment it to trigger a render.
  @State() forceRenderSentinel: number;
  forceRender() {
    this.forceRenderSentinel = (this.forceRenderSentinel + 1) % 100;
  }

  componentDidLoad() {
    const observer = new MutationObserver(() => this.forceRender());
    const options = {
      childList: true
    };
    observer.observe(this.root, options);

    const firstHandle = this.titles[0];
    this.switchToTab(firstHandle);
  }

  render() {
    const tabs = Array.from(document.querySelectorAll("pwc-tabview-tab"));

    this.titles = tabs.map(t => t.title);

    if (tabs.length > 0 && this.activeTab) {
      tabs.forEach(t => (t.active = false));
      this.activeTab.active = true;
    }

    return [
      <div class="pwc-tabview___handle-container">
        {tabs.map(tab => {
          const title = tab.title;
          this.tabs[title] = tab;

          return (
            <pwc-tabview-handle
              title={title}
              active={this.activeTab === tab}
              ref={elem => (this.handles[tab.title] = elem)}
            ></pwc-tabview-handle>
          );
        })}
      </div>,
      <slot />
    ];
  }
}
