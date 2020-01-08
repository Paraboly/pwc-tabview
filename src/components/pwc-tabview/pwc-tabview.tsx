import { Component, h } from "@stencil/core";

@Component({
  tag: "pwc-tabview",
  styleUrl: "../styles.scss",
  shadow: true
})
export class PwcTabview {
  render() {
    return (
      <div class="container">
        <slot />
      </div>
    );
  }
}
