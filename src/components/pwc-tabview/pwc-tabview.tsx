import { Component, h, Element, Listen, State, Event, EventEmitter, Method } from "@stencil/core";
import { PwcTabviewInterfaces } from "../../interfaces/PwcTabviewInterfaces";

@Component({
  tag: "pwc-tabview",
  styleUrl: "../styles.scss",
  shadow: false
})
export class PwcTabview {
  @Element() root: HTMLElement;

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

  componentWillLoad() {
    this.activeTabRef = this.root.querySelector("pwc-tabview-tab");
    this.activeHandle = this.activeTabRef.handle;
    // activeHandleRef is assigned in componentDidLoad
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

    this.activeHandleRef = this.root.querySelector('pwc-tabview-handle[active]');
  }

  // The value has no significance. We increment it to trigger a render.
  @State() forceRenderSentinel: number;

  forceRender() {
    this.forceRenderSentinel = (this.forceRenderSentinel + 1) % 100;
  }

  render() {
    const tabs = Array.from(document.querySelectorAll("pwc-tabview-tab"));

    if(tabs.length > 0) {
      tabs.forEach(t => (t.active = false));
      this.activeTabRef.active = true;        
    }

    return [
      <div class="pwc-tabview___handle-container">
        {tabs.map(tab => {
          return (
            <pwc-tabview-handle
              tab={tab}
              active={this.activeTabRef === tab}
            >{tab.handle}</pwc-tabview-handle>
          );
        })}
      </div>,
      <slot />
    ];
  }
}
