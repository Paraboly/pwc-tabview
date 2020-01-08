import { Component, h, Prop, Element, Method, State } from "@stencil/core";

@Component({
  tag: "pwc-tabview-tab",
  styleUrl: "../styles.scss",
  shadow: true
})
export class PwcTabviewTab {
  @Element() root: HTMLElement;

  @Prop() handle: string;

  @Prop() active: boolean;

  render() {
    const classList = ["tab"];
    if (this.active) {
      classList.push("active-tab");
    }

    return (
      <div class={classList.join(" ")}>
        <slot />
      </div>
    );
  }
}
