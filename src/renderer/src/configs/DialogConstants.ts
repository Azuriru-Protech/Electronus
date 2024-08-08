// import { HideDialog, ShowDialog } from "@/utilities/EventBus";

// export const DialogType = {
//   SUCCESS: 1,
//   ERROR: 2,
//   PROMPT: 3,
// } as const;

// export type DialogType = typeof DialogType[keyof typeof DialogType];

// export type DialogPackModel = {
//   show: boolean;
//   title: string;
//   message: string;
//   type: DialogType;
//   primaryBtn: {
//     callback: () => void;
//     label: string;
//   };
//   secondaryBtn: {
//     callback: () => void;
//     label: string;
//   };
// }

// export const DialogPack : DialogPackModel= {
//   show:false,
//   title: "",
//   message: "",
//   type: DialogType.PROMPT,
//   primaryBtn: {
//     callback:()=> {
//      HideDialog()
//     },
//     label:"Continue",
//   },
//   secondaryBtn: {
//     callback:()=> {
//       HideDialog()
//     },
//     label: "Back",
//   },
// };

// export function GetDialogPack(override: Partial<DialogPackModel>): DialogPackModel {
//   return { ...DialogPack, ...override };

// }

// export function ShowMessage(override:any) {
//   ShowDialog(GetDialogPack(override));
// }
