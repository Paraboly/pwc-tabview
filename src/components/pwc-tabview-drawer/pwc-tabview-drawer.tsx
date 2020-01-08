import { Component, h } from "@stencil/core";

@Component({
  tag: "pwc-tabview-drawer",
  styleUrl: "../styles.scss",
  shadow: true
})
export class PwcTabviewDrawer {
  render() {
    return (
      <div class="drawer">
        <slot />
      </div>
    );
  }
}
