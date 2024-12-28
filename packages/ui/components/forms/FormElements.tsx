import { CheckboxFieldFormElement } from "./flelds/CheckboxField";
import { DateFieldFormElement } from "./flelds/DateField";
import { NumberFieldFormElement } from "./flelds/NumberField";
import { ParagprahFieldFormElement } from "./flelds/ParagraphField";
import { SelectFieldFormElement } from "./flelds/SelectField";
import { SeparatorFieldFormElement } from "./flelds/SeparatorField";
import { SpacerFieldFormElement } from "./flelds/SpacerField";
import { SubTitleFieldFormElement } from "./flelds/SubTitleField";
import { TextAreaFormElement } from "./flelds/TextAreaField";
import { TitleFieldFormElement } from "./flelds/TitleField";
import { TextFieldFormElement } from "./flelds/TextField";
import { RadioGroupFormElement } from "./flelds/RadioGroup";
import { PhoneNumberFieldFormElement } from "./flelds/PhoneNumber";
import { EmailFieldFormElement } from "./flelds/EmailField";
import { RateFieldFormElement } from "./flelds/RatingField";
import { MultiCheckboxFieldFormElement } from "./flelds/MultiCheckField";

export type ElementsType =
  | "TextField"
  | "TitleField"
  | "SubTitleField"
  | "ParagraphField"
  | "SeparatorField"
  | "SpacerField"
  | "NumberField"
  | "TextAreaField"
  | "DateField"
  | "SelectField"
  | "CheckboxField"
  | "RadioGroup"
  | "PhoneNumber"
  | "Email"
  | "Rating"
  | "MultipleField";

export type SubmitFunction = (key: string, value: string) => void;

export type FormElement = {
  type: ElementsType;

  construct: (id: string) => FormElementInstance;

  designerBtnElement: {
    icon: React.ElementType;
    label: string;
  };

  designerComponent: React.FC<{
    elementInstance: FormElementInstance;
  }>;
  formComponent: React.FC<{
    elementInstance: FormElementInstance;
    submitValue?: SubmitFunction;
    isInvalid?: boolean;
    defaultValue?: string;
  }>;
  propertiesComponent: React.FC<{
    elementInstance: FormElementInstance;
  }>;

  validate: (formElement: FormElementInstance, currentValue: string) => boolean;
};

export type FormElementInstance = {
  id: string;
  type: ElementsType;
  extraAttributes?: Record<string, any>;
};

type FormElementsType = {
  [key in ElementsType]: FormElement;
};
export const FormElements: FormElementsType = {
  MultipleField: MultiCheckboxFieldFormElement,
  Rating: RateFieldFormElement,
  Email: EmailFieldFormElement,
  PhoneNumber: PhoneNumberFieldFormElement,
  RadioGroup: RadioGroupFormElement,
  TextField: TextFieldFormElement,
  TitleField: TitleFieldFormElement,
  SubTitleField: SubTitleFieldFormElement,
  ParagraphField: ParagprahFieldFormElement,
  SeparatorField: SeparatorFieldFormElement,
  SpacerField: SpacerFieldFormElement,
  NumberField: NumberFieldFormElement,
  TextAreaField: TextAreaFormElement,
  DateField: DateFieldFormElement,
  SelectField: SelectFieldFormElement,
  CheckboxField: CheckboxFieldFormElement,
};
