import {
  Component,
  h,
  Prop,
  Event,
  EventEmitter,
  Element
} from "@stencil/core";
import { PwcTabviewInterfaces } from "../../interfaces/PwcTabviewInterfaces";

@Component({
  tag: "pwc-tabview-handle",
  styleUrl: "../styles.scss",
  shadow: true
})
export class PwcTabviewHandle {
  @Element() root: HTMLPwcTabviewHandleElement;

  @Prop() tab: HTMLPwcTabviewTabElement;

  @Prop() active: boolean;

  @Event() handleClicked: EventEmitter<
    PwcTabviewInterfaces.IHandleClickedEventPayload
  >;

  render() {
    const classList = ["handle"];
    if (this.active) {
      classList.push("active-handle");
    }

    return (
      <div class={classList.join(" ")} onClick={e => this.handleOnClick(e)}>
        {this.tab.handle}
      </div>
    );
  }

  handleOnClick(e: MouseEvent): void {
    e.preventDefault();
    e.stopPropagation();
    this.handleClicked.emit({
      originalEvent: e,
      handle: this.root,
      tab: this.tab
    });
  }
}
