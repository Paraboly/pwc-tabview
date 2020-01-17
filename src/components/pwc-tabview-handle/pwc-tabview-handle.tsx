import {
  h,
  Component,
  Prop,
  Event,
  EventEmitter,
  Element,
  Watch,
  Listen
} from "@stencil/core";
import { PwcTabviewInterfaces } from "../../interfaces/PwcTabviewInterfaces";

@Component({
  tag: "pwc-tabview-handle",
  styleUrl: "../styles.scss",
  shadow: false
})
export class PwcTabviewHandle {
  @Element() root: HTMLPwcTabviewHandleElement;

  @Prop() tab: HTMLPwcTabviewTabElement;

  @Prop() active: boolean;
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
      handle: this.root,
      tab: this.tab
    });
  }

  componentWillRender() {
    this.activeWatchHandler(this.active);
  }

  render() {
    return <slot />;
  }
}
