export function replace(arr, content) {
    content = content.replace(new RegExp(`<span id="contract_name" style="color: #5488f9;">#债人姓名#</span>`, 'gm'), `<span id="contract_name" style="color: #5488f9;">${arr.caseUserName}</span>`)
    let arrs = []
    if (arr.caseInfo === undefined) {
        arr['caseInfo'] = arr.caseList
    }
    arr.caseInfo.map((item, index) => {
        let val = `<p>（${index + 1}）：<span id="contract_code" style="color: #5488f9;">${item.loanPactNo}</span>的借款，金额<span id="contract_money" style="color: #5488f9;">${item.loanPactAmount}</span>元；</p>`
        arrs.push(val)
    })
    arrs.pop()
    let str = arrs.join('')
    content = content.replace(new RegExp(`<span id="contract_code_money" style="color: #5488f9;">#案件合同编号和合同金额#</span>`, 'gm'), str)
    content = content.replace(new RegExp(`<span id="surplus_repay_moeny" style="color: #5488f9;">#共债合计处置金额#</span>`, 'gm'), `<span id="surplus_repay_moeny" style="color: #5488f9;">${arr.handleAmount}</span>`)
    content = content.replace(new RegExp(`<span id="debt_surplus_repay_moeny" style="color: #5488f9;">#共债剩余待还金额#</span>`, 'gm'), `<span id="debt_surplus_repay_moeny" style="color: #5488f9;">${arr.caseStayRepayMoney}</span>`)
    content = content.replace(new RegExp(`<span id="creditor" style="color: #5488f9;">#债权方#</span>`, 'gm'), `<span id="creditor" style="color: #5488f9;">${arr.creditorsName}</span>`)
    content = content.replace(new RegExp(`<span id="raw_creditor" style="color: #5488f9;">#原债权方#</span>`, 'gm'), `<span id="raw_creditor" style="color: #5488f9;">${arr.originCreditor}</span>`)
    content = content.replace(new RegExp(`<span id="should_repay_principal" style="color: #5488f9;">#合同总金额#</span>`, 'gm'), `<span id="should_repay_principal" style="color: #5488f9;">${arr.loanPactAmount}</span>`)
    content = content.replace(new RegExp(`<span id="should_repay_interest" style="color: #5488f9;">#共债应还总利息#</span>`, 'gm'), `<span id="should_repay_interest" style="color: #5488f9;">${arr.transFee}</span>`)
    // content = content.replace(new RegExp(`<span id="should_repay_principal" style="color: #5488f9;">#应还本金#</span>`, 'gm'), `<span id="should_repay_principal" style="color: #5488f9;">${arr.transPrincipal}</span>`)
    return content;
}

export function replacemed(arr, content) {
    content = content.replace(new RegExp(`<span id="case_name" style="color: #5488f9;">#债人姓名#</span>`, 'gm'), `<span id="contract_name" style="color: #5488f9;">${arr.caseUserName}</span>`)
    content = content.replace(new RegExp(`<span id="appoint_repay_date" style="color: #5488f9;">#约定还款日#</span>`, 'gm'), `<span id="appoint_repay_date" style="color: #5488f9;">2021年10月28日</span>`)
    content = content.replace(new RegExp(`<span id="debt_should_repay_money" style="color: #5488f9;">#共债应还本金#</span>`, 'gm'), `<span id="debt_should_repay_money" style="color: #5488f9;">${arr.transPrincipal}</span>`)
    content = content.replace(new RegExp(`<span id="debt_surplus_repay_moeny" style="color: #5488f9;">#共债剩余待还金额#</span>`, 'gm'), `<span id="debt_surplus_repay_moeny" style="color: #5488f9;">${arr.caseStayRepayMoney}</span>`)
    content = content.replace(new RegExp(`<span id="creditor" style="color: #5488f9;">#债权方#</span>`, 'gm'), `<span id="creditor" style="color: #5488f9;">${arr.creditorsName}</span>`)
    content = content.replace(new RegExp(`<span id="should_repay_interest" style="color: #5488f9;">#应还利息#</span>`, 'gm'), `<span id="should_repay_interest" style="color: #5488f9;">${arr.transFee}</span>`)
    content = content.replace(new RegExp(`<span id="repayment_periods" style="color: #5488f9;">#还款期数#</span>`, 'gm'), `<span id="repayment_periods" style="color: #5488f9;">6</span>`)
    content = content.replace(new RegExp(`<span id="period_limit" style="color: #5488f9;">#每期额度#</span>`, 'gm'), `<span id="period_limit" style="color: #5488f9;">200</span>`)
    content = content.replace(new RegExp(`<span id="deadline" style="color: #5488f9;">#最后一期还款时间#</span>`, 'gm'), `<span id="deadline" style="color: #5488f9;">2021年10月28日</span>`)
    content = content.replace(new RegExp(`<span id="handle_amount" style="color: #5488f9;">#共债合计处置金额#</span>`, 'gm'), `<span id="handle_amount" style="color: #5488f9;">${arr.handleAmount}</span>`)
    content = content.replace(new RegExp(`<span id="repay_date" style="color: #5488f9;">#还款日#</span>`, 'gm'), `<span id="repay_date" style="color: #5488f9;">15</span>`)
    return content;
}