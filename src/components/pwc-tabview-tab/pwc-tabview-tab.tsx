import {
  Component,
  h,
  Prop,
  Element,
  Watch,
  Event,
  EventEmitter
} from "@stencil/core";

@Component({
  tag: "pwc-tabview-tab",
  styleUrl: "pwc-tabview-tab.scss",
  shadow: false
})
export class PwcTabviewTab {
  @Element() root: HTMLPwcTabviewTabElement;

  @Event() tabModified: EventEmitter;

  @Prop({ reflect: true }) title: string;
  @Watch("title")
  titleWatchHandler() {
    this.tabModified.emit();
  }

  @Prop({ reflect: true }) active: boolean;
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
