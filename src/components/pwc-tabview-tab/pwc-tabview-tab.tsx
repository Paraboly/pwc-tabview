import { Component, h, Prop, Element, Watch, Event, EventEmitter } from "@stencil/core";

@Component({
  tag: "pwc-tabview-tab",
  styleUrl: "../styles.scss",
  shadow: false
})
export class PwcTabviewTab {
  @Element() root: HTMLElement;

  @Event() tabChanged: EventEmitter;

  @Prop() handle: string;
  @Watch('handle')
  watchHandler() {
    this.tabChanged.emit();
  }

  @Prop() active: boolean;
  @Watch("active")
  activeWatchHandler(newValue: boolean) {
    if (newValue) {
      this.root.classList.add("pwc-tabview___active-tab");
    } else {
      this.root.classList.remove("pwc-tabview___active-tab");
    }
  }

  componentWillRender() {
    this.activeWatchHandler(this.active);
  }

  render() {
    return <slot />;
  }
}
