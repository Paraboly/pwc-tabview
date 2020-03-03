import {
  Component,
  Prop,
  Event,
  EventEmitter,
  Element,
  Watch,
  Listen
} from "@stencil/core";
import { IHandleClickedEventPayload } from "./IHandleClickedEventPayload";

@Component({
  tag: "pwc-tabview-handle",
  styleUrl: "pwc-tabview-handle.scss",
  shadow: false
})
export class PwcTabviewHandle {
  @Element() root: HTMLPwcTabviewHandleElement;

  @Prop() title: string;

  private readonly defaultActive = false;
  @Prop({ reflect: true }) active: boolean = this.defaultActive;
  @Watch("active")
  activeWatchHandler(newValue: boolean) {
    if (newValue === null || newValue === undefined) {
      this.active = this.defaultActive;
    }
  }

  @Event() handleClicked: EventEmitter<IHandleClickedEventPayload>;

  @Listen("click")
  clickEventHandler(event: MouseEvent) {
    this.handleClicked.emit({
      originalEvent: event,
      handle: this.root,
      title: this.title
    });
  }

  componentWillRender() {
    this.activeWatchHandler(this.active);
  }

  render() {
    return this.title;
  }
}
