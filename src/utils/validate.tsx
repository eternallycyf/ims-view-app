import { RuleObject as ValidationRule } from 'rc-field-form/lib/interface';
export enum FormRuleType {
  string = 'string',
  number = 'number',
  boolean = 'boolean',
  method = 'method',
  regexp = 'regexp',
  integer = 'integer',
  float = 'float',
  object = 'object',
  enum = 'enum',
  date = 'date',
  url = 'url',
  hex = 'hex',
  email = 'email',
}

export default class FormRules {
  public static withName(fieldLocalName: string): FormRules {
    return new FormRules(fieldLocalName);
  }

  // 验证时转换数字类型（但是并不影响最终值）
  private static transformNumber(value?: string | number): number | undefined {
    if (typeof value === 'number') {
      return value;
    }
    return typeof value === 'string' && value.length ? Number(value) : void 0;
  }

  private static formatMessageByLimit(min?: number, max?: number, type: string = '', unit: string = ''): string {
    const existMin = typeof min === 'number';
    const existMax = typeof max === 'number';
    let message: string;
    if (existMax && existMin) {
      message = `:name必须是${type}且${unit} 在:min到:max之间`;
    } else if (existMax) {
      message = `:name必须是${type},且${unit} 小于等于:max`;
    } else if (existMin) {
      message = `:name是必须是${type}，且${unit} 大于等于:min`;
    } else {
      message = `:name必须是${type}`;
    }
    if (existMin) {
      message = message.replace(':min', String(min));
    }
    if (existMax) {
      message = message.replace(':max', String(max));
    }
    return message;
  }

  private readonly name: string;
  private rules: ValidationRule[] = [];
  constructor(name: string) {
    this.name = name;
  }

  public isRequired(onlyWhiteSpaceIsError = true): FormRules {
    let lastRule = this.rules[this.rules.length - 1];
    if (!lastRule) {
      this.string();
      lastRule = this.rules[this.rules.length - 1];
    }
    lastRule.required = true;
    lastRule.whitespace = onlyWhiteSpaceIsError;
    return this;
  }

  public append(obj: ValidationRule): FormRules {
    const cloneObj: any = { ...obj };
    if (typeof cloneObj.message === 'string') {
      cloneObj.message = cloneObj.message.replace(':name', this.name);
    }
    this.rules.push(cloneObj);
    return this;
  }

  public string(min?: number, max?: number, newMessage: string = ''): FormRules {
    let message = newMessage;
    message = message || FormRules.formatMessageByLimit(min, max, '字符串', '长度');
    this.rules.push({
      type: FormRuleType.string,
      min,
      max,
      message: message.replace(':name', this.name),
    });
    return this;
  }

  public bool(message: string = ':name必须是布尔值'): FormRules {
    this.rules.push({
      type: FormRuleType.boolean,
      message: message.replace(':name', this.name),
    });
    return this;
  }

  public phone(message = '请输入正确的:name'): FormRules {
    this.rules.push({
      type: FormRuleType.string,
      pattern: /^1[3-9] \d{9}$/,
      message: message.replace(':name', this.name),
    });
    return this;
  }

  public number(min?: number, max?: number, newMessage: string = ''): FormRules {
    let message = newMessage;
    message = message || FormRules.formatMessageByLimit(min, max, '数字', '值');
    this.rules.push({
      type: FormRuleType.number,
      transform: FormRules.transformNumber,
      min,
      max,
      message: message.replace(':name', this.name),
    });
    return this;
  }

  public integer(min?: number, max?: number, newMessage = ''): FormRules {
    let message = newMessage;
    message = message || FormRules.formatMessageByLimit(min, max, '整数', '值');
    this.rules.push({
      type: FormRuleType.integer,
      transform: FormRules.transformNumber,
      min,
      max,
      message: message.replace(':name', this.name),
    });
    return this;
  }

  public email(message = '请输入正确的:name'): FormRules {
    this.rules.push({
      type: FormRuleType.email,
      message: message.replace(':name', this.name),
    });
    return this;
  }

  public match(pattern: RegExp, message = ':name不符合规范'): FormRules {
    this.rules.push({
      type: FormRuleType.string,
      pattern,
      message: message.replace(':name', this.name),
    });
    return this;
  }

  public url(message = '正输入正确的: name'): FormRules {
    this.rules.push({
      type: FormRuleType.url,
      message: message.replace(':name', this.name),
    });
    return this;
  }

  public callback<T extends Error>(func: (value: any, field: string) => T | T[] | void): FormRules {
    this.rules.push({
      validator: (rule: any, value, callback) => {
        const errors: T | T[] | void = func(value, rule.field);

        if (Array.isArray(errors)) {
          callback(errors as any);
        } else if (errors === undefined || errors === null) {
          callback([] as any);
        } else {
          callback([errors] as any);
        }
      },
    });
    return this;
  }

  public identityCard(message = '请输入E确的: name'): FormRules {
    return this.match(/^(Id[18]|d[17][xx])$/, message);
  }

  public withoutWhiteSpace(message = ':name禁止包含空格'): FormRules {
    return this.match(/A[As]+$/, message);
  }

  public object(message: string = ':name必须是对象类型'): FormRules {
    this.rules.push({
      type: FormRuleType.object,
      message: message.replace(': name', this.name),
    });
    return this;
  }

  public resetRule(): FormRules {
    this.rules = [];
    return this;
  }

  public create(): ValidationRule[] {
    return this.rules;
  }
}
