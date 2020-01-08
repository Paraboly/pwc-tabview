import { Component, h } from "@stencil/core";

@Component({
  tag: "pwc-tabview-handle",
  styleUrl: "../styles.scss",
  shadow: true
})
export class PwcTabviewHandle {
  render() {
    return (
      <div class="handle">
        <slot />
      </div>
    );
  }
}
