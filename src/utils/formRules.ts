import type { FormRules } from 'element-plus'

interface RuleFormType {
  required: string
}
const rules: FormRules<RuleFormType> = {
  required: [
    {
        required: true, message: '请输入内容', trigger: 'manual'
    }
  ]
}

export default rules;