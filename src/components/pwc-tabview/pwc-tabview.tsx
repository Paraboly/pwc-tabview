import { Component, h, Element, Listen, State, Event, EventEmitter, Method } from "@stencil/core";
import { PwcTabviewInterfaces } from "../../interfaces/PwcTabviewInterfaces";

@Component({
  tag: "pwc-tabview",
  styleUrl: "../styles.scss",
  shadow: false
})
export class PwcTabview {
  @Element() root: HTMLElement;

  private handles: string[] = [];
  private tabRefs: { [key: string] : HTMLPwcTabviewTabElement } = {};
  private handleRefs: { [key: string] : HTMLPwcTabviewHandleElement } = {};

  @Event() tabChanged: EventEmitter<PwcTabviewInterfaces.ITabChangedEventPayload>;

  @Listen('tabModified')
  tabModifiedEventHandler(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.forceRender();
  }

  @Listen("handleClicked")
  handleClickedHandler(
    event: CustomEvent<PwcTabviewInterfaces.IHandleClickedEventPayload>
  ) {
    const tabRef = event.detail.tab;
    const handleRef = event.detail.handle;
    const handle = tabRef.handle;

    this.activeHandle = handle;
    this.activeTabRef = tabRef;
    this.activeHandleRef = handleRef;

    this.tabChanged.emit({
      type: "handleClick",
      originalEvent: event,
      handle: handle,
      tabRef: tabRef,
      handleRef: handleRef
    });
  }

  @State() activeHandle: string;
  private activeTabRef: HTMLPwcTabviewTabElement;
  private activeHandleRef: HTMLPwcTabviewHandleElement;

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
    const tabRef = this.tabRefs[handle];
    const handleRef = this.handleRefs[handle];

    this.activeHandle = handle;
    this.activeTabRef = tabRef;
    this.activeHandleRef = handleRef;

    this.tabChanged.emit({
      type: "manual",
      originalEvent: null,
      handle: handle,
      tabRef: tabRef,
      handleRef: handleRef
    });
  }

  onChildrenChange()
  {
    this.forceRender();
  }

  componentDidLoad() {
    const observer = new MutationObserver(() => this.onChildrenChange())
    const options = {
      childList: true
    };
    observer.observe(this.root, options);

    const firstHandle = this.handles[0];
    this.switchToTab(firstHandle);
  }

  // The value has no significance. We increment it to trigger a render.
  @State() forceRenderSentinel: number;

  forceRender() {
    this.forceRenderSentinel = (this.forceRenderSentinel + 1) % 100;
  }

  render() {
    const tabs = Array.from(document.querySelectorAll("pwc-tabview-tab"));

    this.handles = tabs.map(t => t.handle);

    if(tabs.length > 0 && this.activeTabRef) {
      tabs.forEach(t => (t.active = false));
      this.activeTabRef.active = true;
    }

    return [
      <div class="pwc-tabview___handle-container">
        {tabs.map(tab => {
          this.tabRefs[tab.handle] = tab;
          return (
            <pwc-tabview-handle
              tab={tab}
              active={this.activeTabRef === tab}
              ref={elem => this.handleRefs[tab.handle] = elem}
            >{tab.handle}</pwc-tabview-handle>
          );
        })}
      </div>,
      <slot />
    ];
  }
}
