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

  private readonly defaultActive = false;
  @Prop({ reflect: true }) active: boolean = this.defaultActive;
  @Watch("active")
  activeWatchHandler(newValue: boolean) {
    if (newValue === null || newValue === undefined) {
      this.active = this.defaultActive;
    }
  }

  componentWillRender() {
    this.activeWatchHandler(this.active);
  }

  render() {
    return <slot />;
  }
}
