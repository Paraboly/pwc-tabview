// tslint:disable-next-line: no-namespace
export namespace PwcTabviewInterfaces {
  export interface IHandleClickedEventPayload {
    originalEvent: MouseEvent;
    handle: HTMLPwcTabviewHandleElement;
    tab: HTMLPwcTabviewTabElement;
  }

  export interface ITabChangedEventPayload {
    type: "manual" | "handleClick";
    originalEvent: CustomEvent<PwcTabviewInterfaces.IHandleClickedEventPayload>;
    handle: string;
    tabRef: HTMLPwcTabviewTabElement;
    handleRef: HTMLPwcTabviewHandleElement;
  }
}
