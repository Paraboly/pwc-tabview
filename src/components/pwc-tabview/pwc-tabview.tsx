import { Component, h, Element, Listen, State } from "@stencil/core";
import { PwcTabviewInterfaces } from "../../interfaces/PwcTabviewInterfaces";

@Component({
  tag: "pwc-tabview",
  styleUrl: "../styles.scss",
  shadow: true
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
    return (
      <div class="container">
        <div class="tab-container">
          <slot />
        </div>
        {this.createDrawer(tabs)}
      </div>
    );
  }

  createDrawer(tabs: HTMLPwcTabviewTabElement[]) {
    return (
      <pwc-tabview-drawer>
        {tabs.map(tab => {
          return (
            <pwc-tabview-handle tab={tab} active={this.activeTab === tab}>
              {tab.handle}
            </pwc-tabview-handle>
          );
        })}
      </pwc-tabview-drawer>
    );
  }
}
