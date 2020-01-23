import {
  Component,
  Prop,
  Event,
  EventEmitter,
  Element,
  Watch,
  Listen
} from "@stencil/core";
import { PwcTabviewInterfaces } from "../../interfaces/pwc-tabview-interfaces";

@Component({
  tag: "pwc-tabview-handle",
  styleUrl: "../styles.scss",
  shadow: false
})
export class PwcTabviewHandle {
  @Element() root: HTMLPwcTabviewHandleElement;

  @Prop() handle: string;

  @Prop({ reflect: true }) active: boolean;
  @Watch("active")
  activeWatchHandler(newValue: boolean) {
    if (newValue) {
      this.root.classList.add("pwc-tabview___active-handle");
    } else {
      this.root.classList.remove("pwc-tabview___active-handle");
    }
  }

  @Event() handleClicked: EventEmitter<
    PwcTabviewInterfaces.IHandleClickedEventPayload
  >;

  @Listen("click")
  clickEventHandler(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.handleClicked.emit({
      originalEvent: event,
      handleRef: this.root,
      handle: this.handle
    });
  }

  componentWillRender() {
    this.activeWatchHandler(this.active);
  }

  render() {
    return this.handle;
  }
}
