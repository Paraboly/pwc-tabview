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
import { PwcTabviewInterfaces } from "../../interfaces/PwcTabviewInterfaces";

@Component({
  tag: "pwc-tabview",
  styleUrl: "../styles.scss",
  shadow: false
})
export class PwcTabview {
  @Element() root: HTMLElement;

  @State() activeHandle: string;
  @Watch("activeHandle")
  activeHandleWatchHandler(newValue) {
    this.activeTabRef = this.tabRefs[newValue];
    this.activeHandleRef = this.handleRefs[newValue];
  }

  private activeTabRef: HTMLPwcTabviewTabElement;
  private activeHandleRef: HTMLPwcTabviewHandleElement;

  private handles: string[] = [];
  private tabRefs: { [key: string]: HTMLPwcTabviewTabElement } = {};
  private handleRefs: { [key: string]: HTMLPwcTabviewHandleElement } = {};

  @Event() tabChanged: EventEmitter<
    PwcTabviewInterfaces.ITabChangedEventPayload
  >;

  @Listen("tabModified")
  tabModifiedEventHandler(event: Event) {
    event.stopPropagation();
    event.preventDefault();

    this.forceRender();
  }

  @Listen("handleClicked")
  handleClickedHandler(
    event: CustomEvent<PwcTabviewInterfaces.IHandleClickedEventPayload>
  ) {
    event.stopPropagation();
    event.preventDefault();

    const handle = event.detail.handle;
    this.switchToTab(handle);
  }

  @Method()
  async getActiveState() {
    return {
      handle: this.activeHandle,
      tabRef: this.activeTabRef,
      handleRef: this.activeHandleRef
    };
  }

  @Method()
  async switchToTab(handle: string) {
    this.activeHandle = handle;

    this.tabChanged.emit({
      handle,
      tabRef: this.activeTabRef,
      handleRef: this.activeHandleRef
    });
  }

  onChildrenChange() {
    this.forceRender();
  }

  // The value has no significance. We increment it to trigger a render.
  @State() forceRenderSentinel: number;
  forceRender() {
    this.forceRenderSentinel = (this.forceRenderSentinel + 1) % 100;
  }

  componentDidLoad() {
    const observer = new MutationObserver(() => this.onChildrenChange());
    const options = {
      childList: true
    };
    observer.observe(this.root, options);

    const firstHandle = this.handles[0];
    this.switchToTab(firstHandle);
  }

  render() {
    const tabs = Array.from(document.querySelectorAll("pwc-tabview-tab"));

    this.handles = tabs.map(t => t.handle);

    if (tabs.length > 0 && this.activeTabRef) {
      tabs.forEach(t => (t.active = false));
      this.activeTabRef.active = true;
    }

    return [
      <div class="pwc-tabview___handle-container">
        {tabs.map(tabRef => {
          const handle = tabRef.handle;
          this.tabRefs[handle] = tabRef;

          return (
            <pwc-tabview-handle
              handle={handle}
              active={this.activeTabRef === tabRef}
              ref={elem => (this.handleRefs[tabRef.handle] = elem)}
            ></pwc-tabview-handle>
          );
        })}
      </div>,
      <slot />
    ];
  }
}
