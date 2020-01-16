import { Component, h, Element, Listen, State } from "@stencil/core";
import { PwcTabviewInterfaces } from "../../interfaces/PwcTabviewInterfaces";

@Component({
  tag: "pwc-tabview",
  styleUrl: "../styles.scss",
  shadow: false
})
export class PwcTabview {
  // The value has no significance. We increment it to trigger a render.
  @State() forceRenderSentinel: number;

  @Element() root: HTMLElement;

  @Listen("handleClicked")
  handleClickedHandler(
    event: CustomEvent<PwcTabviewInterfaces.IHandleClickedEventPayload>
  ) {
    const tab = event.detail.tab;
    this.activeTab = tab;
  }

  @State() activeTab: HTMLPwcTabviewTabElement;

  componentWillLoad() {
    this.activeTab = document.querySelector("pwc-tabview-tab");
  }

  onChildrenChange()
  {
    this.forceRenderSentinel++;
  }

  componentDidLoad() {
    const observer = new MutationObserver(() => this.onChildrenChange())
    observer.observe(this.root, { childList: true })
  }

  render() {
    const tabs = Array.from(document.querySelectorAll("pwc-tabview-tab"));

    if(tabs.length > 0) {
      tabs.forEach(t => (t.active = false));
      this.activeTab.active = true;        
    }

    return [
      <div class="pwc-tabview___handle-container">
        {tabs.map(tab => {
          return (
            <pwc-tabview-handle
              tab={tab}
              active={this.activeTab === tab}
            ></pwc-tabview-handle>
          );
        })}
      </div>,
      <slot />
    ];
  }
}
