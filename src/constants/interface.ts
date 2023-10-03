import { AlertColor } from "@mui/material";

export interface IAlert {
  isOpen: boolean;
  notice: string;
  severity?: AlertColor;
}
