// import { ConfirmDialogProps } from "@renderer/components/dialogs/ConfirmDialog/ConfirmDialog";
// import { DialogPack, DialogPackModel } from "@/configs/DialogConstants";

// type EventCallback = (data: any) => void;

// interface EventDetail {
//   showLoading: boolean;
//   loadingMessage: string | string[];
// }

// export const EventBus = {
//   on(event: string, callback: EventCallback) {
//     document.addEventListener(event, (e: Event) => {
//       const customEvent = e as CustomEvent;
//       callback(customEvent.detail);
//     });
//   },
//   dispatch(event: string, data: any) {
//     document.dispatchEvent(new CustomEvent(event, { detail: data }));
//   },
//   remove(event: string, callback: EventCallback) {
//     document.removeEventListener(event, callback as EventListener);
//   },
// };

// export const ShowLoading = (message: string) => {
//   EventBus.dispatch("loading", { showLoading: true, loadingMessage: message });
// };

// export const HideLoading = () => {
//   EventBus.dispatch("loading", { showLoading: false, loadingMessage: "" });
// };

// export const ShowDialog = (dialogPack: DialogPackModel) => {
//   EventBus.dispatch("dialog", dialogPack);
// };

// export const HideDialog = () => {
//   EventBus.dispatch("dialog", DialogPack);
// };

// export const ShowConfirmDialog = (confirmDialogProps: ConfirmDialogProps) => {
//   EventBus.dispatch("confirm", confirmDialogProps);
// };
