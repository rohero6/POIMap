import Schema from"../common/async-validator/index";export default Behavior({behaviors:[],properties:{rules:{type:[Object,Array],value:[]},tipType:{type:String,value:"toast"}},data:{schema:"",tipFun:{message:"showMessage",toast:"showToast"},tipContent:{message:"content",toast:"title"},errorText:"",errors:[]},methods:{initRules(){const{rules:t}=this.data;t&&("[object Object]"===Object.prototype.toString.call(t)&&(this.data.rules=[t]),this.data.rules.forEach(t=>{t.trigger?"string"!=typeof t.trigger||(t.trigger=[t.trigger]):t.trigger=[]}))},getNeedValidateRule(t){const e=this.data.name,{rules:a}=this.data;if(!a)return;const r=t?a.filter(e=>e.trigger.indexOf(t)>-1):a,s=new Schema({[e]:r});return this.setData({schema:s}),r},validatorData(t,e){const{tipType:a,tipFun:r,tipContent:s}=this.data;this.getNeedValidateRule(e)&&this.data.schema.validate(t,t=>{if(this.setData({errors:t||[]}),this.triggerEvent("linvalidate",{errors:t,isError:!!t}),t&&a){const e=r[a],i=s[a];return"text"===a?(this.setData({errorText:t[0].message}),t):wx.lin&&wx.lin[e]?(wx.lin[e]&&wx.lin[e]({[i]:t[0].message,duration:1500,mask:!1}),t):(wx.showToast({icon:"none",title:`请在页面内引入${a}组件`}),t)}!t&&a&&this.setData({errorText:""})})}}});