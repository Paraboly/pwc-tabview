import { Component, h, Element, Listen, State } from "@stencil/core";
import { PwcTabviewInterfaces } from "../../interfaces/PwcTabviewInterfaces";

@Component({
  tag: "pwc-tabview",
  styleUrl: "../styles.scss",
  shadow: false
})
export class PwcTabview {
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

  render() {
    const tabs = Array.from(document.querySelectorAll("pwc-tabview-tab"));
    tabs.forEach(t => (t.active = false));
    this.activeTab.active = true;
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
