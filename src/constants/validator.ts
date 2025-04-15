import { InternalRuleItem, Value } from "async-validator";

/**
 * 校验正整数
 * @param rule
 * @param value
 * @param callback
 * @returns
 */
export const validatePositiveInteger = (rule: InternalRuleItem, value: Value, callback: (error?: string | Error) => void) => {
  if (value === undefined || value === null || value === "") {
    callback(); // 空值不校验
    return;
  }

  const regex = /^[1-9]\d*$/; // 正整数的正则表达式
  if (!regex.test(String(value))) {
    callback("请输入正整数");
  } else {
    callback(); // 校验通过
  }
}
