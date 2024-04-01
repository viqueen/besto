import React from "react";

import { FieldList, ScalarType } from "@bufbuild/protobuf";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";

interface ProtoFormDialogProps {
  data: {
    fields: FieldList;
    isOpen: boolean;
    title: string;
  };
  actions: {
    closeDialog: () => void;
    submitForm: () => void;
  };
}

const ProtoFormDialog = ({ data, actions }: ProtoFormDialogProps) => {
  return (
    <Dialog
      open={data.isOpen}
      onClose={actions.closeDialog}
      maxWidth="sm"
      fullWidth={true}
    >
      <DialogTitle>{data.title}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 2 }}>
          {data.fields.list().map((field) => {
            switch (field.kind) {
              case "scalar":
                if (field.T === ScalarType.STRING) {
                  return (
                    <TextField
                      key={field.jsonName}
                      label={field.jsonName}
                      name={field.jsonName}
                      required={field.req}
                    />
                  );
                } else if (
                  field.T === ScalarType.INT32 ||
                  field.T === ScalarType.INT64
                ) {
                  return (
                    <TextField
                      key={field.jsonName}
                      label={field.jsonName}
                      name={field.jsonName}
                      required={field.req}
                      type="number"
                    />
                  );
                }
                break;
              case "enum":
                // TODO: handle enum
                break;
              case "map":
                // TODO: handle map
                break;
              default:
                return null;
            }
          })}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={actions.closeDialog}>Cancel</Button>
        <Button onClick={actions.submitForm}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export type { ProtoFormDialogProps };
export { ProtoFormDialog };
