import { Component, h } from "@stencil/core";

@Component({
  tag: "pwc-tabview-tab",
  styleUrl: "../styles.scss",
  shadow: true
})
export class PwcTabviewTab {
  render() {
    return (
      <div class="tab">
        <slot />
      </div>
    );
  }
}
