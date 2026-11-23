"use client";

import * as React from "react";
import type * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import {
  Controller,
  FormProvider,
  useFormContext,
  useFormState,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

import { cn } from "../../lib/utils";
import { Label } from "./label";

const Form = FormProvider;

interface FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  name: TName;
}

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState } = useFormContext();
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const formState = useFormState({ name: fieldContext.name });
  const fieldState = getFieldState(fieldContext.name, formState);

  const { id, ...itemState } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...itemState,
    ...fieldState,
  };
};

interface FormItemContextValue {
  id: string;
  /** Whether a FormDescription / FormMessage is currently rendered, so
   * FormControl only references ids that exist (aria-describedby). */
  hasDescription: boolean;
  hasMessage: boolean;
  setHasDescription: (present: boolean) => void;
  setHasMessage: (present: boolean) => void;
}

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
);

function FormItem({ className, ...props }: React.ComponentProps<"div">) {
  const id = React.useId();
  const [hasDescription, setHasDescription] = React.useState(false);
  const [hasMessage, setHasMessage] = React.useState(false);
  const value = React.useMemo(
    () => ({
      id,
      hasDescription,
      hasMessage,
      setHasDescription,
      setHasMessage,
    }),
    [id, hasDescription, hasMessage]
  );

  return (
    <FormItemContext.Provider value={value}>
      <div
        data-slot="form-item"
        className={cn("grid gap-2", className)}
        {...props}
      />
    </FormItemContext.Provider>
  );
}

/** Report this element's presence to the enclosing FormItem while mounted. */
function useRegisterInFormItem(
  register: (present: boolean) => void,
  present: boolean
) {
  React.useEffect(() => {
    if (!present) return;
    register(true);
    return () => {
      register(false);
    };
  }, [register, present]);
}

function FormLabel({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  const { error, formItemId } = useFormField();

  return (
    <Label
      data-slot="form-label"
      data-error={!!error}
      className={cn(
        "data-[error=true]:text-error-700 dark:data-[error=true]:text-error-300",
        className
      )}
      htmlFor={formItemId}
      {...props}
    />
  );
}

function FormControl({ ...props }: React.ComponentProps<typeof Slot>) {
  const {
    error,
    formItemId,
    formDescriptionId,
    formMessageId,
    hasDescription,
    hasMessage,
  } = useFormField();

  const describedBy =
    [hasDescription && formDescriptionId, hasMessage && formMessageId]
      .filter(Boolean)
      .join(" ") || undefined;

  return (
    <Slot
      data-slot="form-control"
      id={formItemId}
      aria-describedby={describedBy}
      aria-invalid={!!error}
      {...props}
    />
  );
}

function FormDescription({ className, ...props }: React.ComponentProps<"p">) {
  const { formDescriptionId, setHasDescription } = useFormField();
  useRegisterInFormItem(setHasDescription, true);

  return (
    <p
      data-slot="form-description"
      id={formDescriptionId}
      className={cn("text-text text-sm", className)}
      {...props}
    />
  );
}

function FormMessage({ className, ...props }: React.ComponentProps<"p">) {
  const { error, formMessageId, setHasMessage } = useFormField();
  const body = error ? String(error.message) : props.children;
  useRegisterInFormItem(setHasMessage, Boolean(body));

  if (!body) {
    return null;
  }

  return (
    <p
      data-slot="form-message"
      id={formMessageId}
      className={cn("text-error-700 dark:text-error-300 text-sm", className)}
      {...props}
    >
      {body}
    </p>
  );
}

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
};
