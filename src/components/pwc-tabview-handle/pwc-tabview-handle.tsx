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

  @Prop({ reflect: true }) active: boolean;
  @Watch("active")
  activeWatchHandler(newValue: boolean) {
    if (newValue) {
      this.root.classList.add("pwc-tabview___active-handle");
    } else {
      this.root.classList.remove("pwc-tabview___active-handle");
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
