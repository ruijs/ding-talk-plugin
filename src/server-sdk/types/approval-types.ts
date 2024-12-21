export type GetWorkflowFormSchemaResult = {
  result: WorkflowForm;
};

export type WorkflowForm = {
  name: string;
  status: string;
  procType: string;
  creatorUserId: string;
  gmtModified: string;
  formUuid: string;
  bizType: string;
  ownerIdType: string;
  formCode: string;
  icon: string;
  memo: string;
  engineType: string;
  gmtCreate: string;
  schemaContent: WorkflowFormSchema;
  appUuid: string;
  appType: string;
  visibleRange: string;
  listOrder: number;
};

export type WorkflowFormSchema = {
  icon: string;
  title: string;
  items: WorkflowFormItem[];
};

export type WorkflowFormItem =
  | WorkflowTextFieldFormItem
  | WorkflowDDSelectFieldFormItem
  | WorkflowDDDateFieldFormItem
  | WorkflowMoneyFieldFormItem
  | WorkflowDDAttachmentFormItem;

export type WorkflowTextFieldFormItem = {
  componentName: "TextField";
  props: WorkflowTextFieldFormItemProps;
};

export type WorkflowTextFieldFormItemProps = {
  id: string;
  label: string;
  placeholder: string;
  required: boolean;
  staffStatusEnabled: boolean;
  holidayOptions: any[];
  bizAlias: string;
  push: Record<string, any>;
};

export type WorkflowDDSelectFieldFormItem = {
  componentName: "DDSelectField";
  props: WorkflowDDSelectFieldFormItemProps;
};

export type WorkflowDDSelectFieldFormItemProps = {
  id: string;
  label: string;
  placeholder: string;
  required: boolean;
  staffStatusEnabled: boolean;
  holidayOptions: any[];
  bizAlias: string;
  push: Record<string, any>;
  /**
   * "{\"value\":\"多功能交联剂\",\"key\":\"option_0\"}"
   */
  options: string[];
};

export type WorkflowDDDateFieldFormItem = {
  componentName: "DDDateField";
  props: WorkflowDDDateFieldFormItemProps;
};

export type WorkflowDDDateFieldFormItemProps = {
  id: string;
  label: string;
  placeholder: string;
  required: boolean;
  staffStatusEnabled: boolean;
  holidayOptions: any[];
  bizAlias: string;
  push: Record<string, any>;
  /**
   * yyyy-MM-dd
   */
  format: string;
  /**
   * 天
   */
  unit: string;
};

export type WorkflowMoneyFieldFormItem = {
  componentName: "MoneyField";
  props: WorkflowMoneyFieldFormItemProps;
};

export type WorkflowMoneyFieldFormItemProps = {
  id: string;
  label: string;
  placeholder: string;
  required: boolean;
  staffStatusEnabled: boolean;
  holidayOptions: any[];
  bizAlias: string;
  push: Record<string, any>;
};

export type WorkflowDDAttachmentFormItem = {
  componentName: "DDAttachment";
  props: WorkflowDDAttachmentFormItemProps;
};

export type WorkflowDDAttachmentFormItemProps = {
  id: string;
  label: string;
  placeholder: string;
  required: boolean;
  staffStatusEnabled: boolean;
  holidayOptions: any[];
  bizAlias: string;
  push: Record<string, any>;
};
