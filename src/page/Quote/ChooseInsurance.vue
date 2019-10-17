<template>
  <div class="ChooseInsurance">
    <div class="ChooseInsurance-carInfo">
      <div class="ChooseInsurance-carInfo-tit scrm-title-prefix">
        车辆信息
      </div>
      <div class="ChooseInsurance-carInfo-content">
        <div class="ChooseInsurance-carInfo-item">
          <div class="ChooseInsurance-carInfo-item-label">
            车牌号
          </div>
          <div class="ChooseInsurance-carInfo-item-desc">
            {{carInfo.UserInfo.LicenseNo}}
          </div>
        </div>
        <div class="ChooseInsurance-carInfo-item">
          <div class="ChooseInsurance-carInfo-item-label">
            车&nbsp;&nbsp;架&nbsp;&nbsp;号
          </div>
          <div class="ChooseInsurance-carInfo-item-desc">
            {{carInfo.UserInfo.CarVin}}
          </div>
        </div>
        <div class="ChooseInsurance-carInfo-item">
          <div class="ChooseInsurance-carInfo-item-label">
            品牌型号
          </div>
          <div class="ChooseInsurance-carInfo-item-desc">
            {{carInfo.UserInfo.ModleName}}
          </div>
        </div>
        <div class="ChooseInsurance-carInfo-item">
          <div class="ChooseInsurance-carInfo-item-label">
            注册日期
          </div>
          <div class="ChooseInsurance-carInfo-item-desc">
            {{carInfo.UserInfo.RegisterDate}}
          </div>
        </div>
        <div class="ChooseInsurance-carInfo-item hasIcon" @click="checkCar">
          <div class="ChooseInsurance-carInfo-item-label">
            车型校验
          </div>
          <div class="ChooseInsurance-carInfo-item-desc">
            {{ carType }}
          </div>
        </div>
      </div>
    </div>
    <group>
      <!--<x-switch class="scrm-switch" title="交强险" :value-map="['0', '1']" v-model="jiaoqiang"></x-switch>-->
      <!--<cell title="交强险"></cell>-->
      <datetime
        format="YYYY-MM-DD HH:mm"
        v-model="ForceTimeStamp"
        title="交强险起保时间"
        placeholder="请选择交强险起保时间"
      ></datetime>
    </group>
    <group>
      <!--<x-switch class="scrm-switch" title="商业险" :value-map="['0', '1']" v-model="shangye"></x-switch>-->
      <!--<cell title="商业险"></cell>-->
      <datetime
        format="YYYY-MM-DD HH:mm"
        v-model="BizTimeStamp"
        title="商业险起保时间"
        placeholder="请选择商业险起保时间"
      ></datetime>
    </group>
    <div class="ChooseInsurance-configure">
      <button-tab v-model="tabIndex">
        <button-tab-item>基本险</button-tab-item>
        <button-tab-item>附加险</button-tab-item>
      </button-tab>
      <div class="ChooseInsurance-configure-tab" :style="{height:swiperHeight}">
        <swiper v-model="tabIndex" height="100%" :show-dots="false">
          <swiper-item>
            <group>
              <popup-picker class="ChooseInsurance-configure-tab-picker"
                            title="车辆损失险"
                            :data="[{name:'不投保',value:'0'},{name:'投保',value:'1'}]"
                            v-model="CheSun"
                            :placeholder="'请选择'"
                            :columns="1"
                            show-name
                            @on-change="(v)=>{this.pickerChange(v,'BuJiMianCheSun')}"
              ></popup-picker>
              <checklist class="ChooseInsurance-configure-tab-checker"
                         label-position="left"
                         :options="[{key:'1',value:'不计免赔'}]"
                         v-model="BuJiMianCheSun"
                         :disabled="this.CheSun[0]==='0'"
              ></checklist>
              <popup-picker class="ChooseInsurance-configure-tab-picker"
                            title="第三者责任险"
                            :data="SanZheOption"
                            v-model="SanZhe"
                            :columns="1"
                            :placeholder="'请选择'"
                            show-name
                            @on-change="(v)=>{this.pickerChange(v,'BuJiMianSanZhe')}"
              ></popup-picker>
              <checklist class="ChooseInsurance-configure-tab-checker"
                         label-position="left"
                         :options="[{key:'1',value:'不计免赔'}]"
                         v-model="BuJiMianSanZhe"
                         :disabled="this.SanZhe[0]==='0'"
              ></checklist>
              <popup-picker class="ChooseInsurance-configure-tab-picker"
                            :columns="1"
                            title="全车盗抢险"
                            :data="[{name:'不投保',value:'0'},{name:'投保',value:'1'}]"
                            v-model="DaoQiang"
                            :placeholder="'请选择'"
                            show-name
                            @on-change="(v)=>{this.pickerChange(v,'BuJiMianDaoQiang')}"
              ></popup-picker>
              <checklist class="ChooseInsurance-configure-tab-checker"
                         label-position="left"
                         :options="[{key:'1',value:'不计免赔'}]"
                         v-model="BuJiMianDaoQiang"
                         :disabled="this.DaoQiang[0]==='0'"
              ></checklist>
              <popup-picker class="ChooseInsurance-configure-tab-picker"
                            title="司机座位责任险"
                            :data="SiJiOption"
                            v-model="SiJi"
                            :placeholder="'请选择'"
                            :columns="1"
                            show-name
                            @on-change="(v)=>{this.pickerChange(v,'BuJiMianSiJi')}"
              ></popup-picker>
              <checklist class="ChooseInsurance-configure-tab-checker"
                         label-position="left"
                         :options="[{key:'1',value:'不计免赔'}]"
                         v-model="BuJiMianSiJi"
                         :disabled="this.SiJi[0]==='0'"
              ></checklist>
              <popup-picker class="ChooseInsurance-configure-tab-picker"
                            title="乘客座位责任险"
                            :data="ChengKeOption"
                            v-model="ChengKe"
                            :columns="1"
                            :placeholder="'请选择'"
                            show-name
                            @on-change="(v)=>{this.pickerChange(v,'BuJiMianChengKe')}"
              ></popup-picker>
              <checklist class="ChooseInsurance-configure-tab-checker"
                         label-position="left"
                         required
                         :options="[{key:'1',value:'不计免赔'}]"
                         v-model="BuJiMianChengKe"
                         :disabled="this.ChengKe[0]==='0'"
              ></checklist>
            </group>
          </swiper-item>
          <swiper-item>
            <group>
              <popup-picker class="ChooseInsurance-configure-tab-picker"
                            title="划痕险"
                            :data="HuaHenOption"
                            v-model="HuaHen"
                            :placeholder="'请选择'"
                            show-name
                            :columns="1"
                            @on-change="(v)=>{this.pickerChange(v,'BuJiMianHuaHen')}"
              ></popup-picker>
              <checklist class="ChooseInsurance-configure-tab-checker"
                         label-position="left" required
                         :options="[{key:'1',value:'不计免赔'}]"
                         v-model="BuJiMianHuaHen"
                         :disabled="this.HuaHen[0]==='0'"
              ></checklist>
              <popup-picker class="ChooseInsurance-configure-tab-picker"
                            title="自燃损失险"
                            :data="[{name:'投保',value:'1'},{name:'不投保',value:'0'}]"
                            v-model="ZiRan"
                            :placeholder="'请选择'"
                            show-name
                            :columns="1"
                            @on-change="(v)=>{this.pickerChange(v,'BuJiMianZiRan')}"
              ></popup-picker>
              <checklist class="ChooseInsurance-configure-tab-checker"
                         label-position="left"
                         :options="[{key:'1',value:'不计免赔'}]"
                         v-model="BuJiMianZiRan"
                         :disabled="this.ZiRan[0]==='0'"
              ></checklist>
              <popup-picker class="ChooseInsurance-configure-tab-picker"
                            title="涉水行驶损失险"
                            :data="[{name:'投保',value:'1'},{name:'不投保',value:'0'}]"
                            v-model="SheShui"
                            :placeholder="'请选择'"
                            :columns="1"
                            show-name
                            @on-change="(v)=>{this.pickerChange(v,'BuJiMianSheShui')}"
              ></popup-picker>
              <checklist class="ChooseInsurance-configure-tab-checker"
                         label-position="left"
                         :options="['不计免赔']"
                         v-model="BuJiMianSheShui"
                         :disabled="this.SheShui[0]==='0'"
              ></checklist>
              <popup-picker class="ChooseInsurance-configure-tab-picker hasBorder"
                            title="玻璃单独破碎险"
                            :data="BoLiOption"
                            v-model="BoLi"
                            :placeholder="'请选择'"
                            show-name
                            :columns="1"
              ></popup-picker>
              <popup-picker class="ChooseInsurance-configure-tab-picker hasBorder"
                            title="车损无法找到第三方险"
                            :data="[{name:'投保',value:'1'},{name:'不投保',value:'0'}]"
                            v-model="HcSanFangTeYue"
                            :placeholder="'请选择'"
                            :columns="1"
                            show-name
              ></popup-picker>
              <popup-picker class="ChooseInsurance-configure-tab-picker hasBorder"
                            title="指定修理厂险"
                            :data="[{name:'不投保',value:'-1'},{name:'国产',value:'0'},{name:'进口',value:'1'}]"
                            v-model="HcXiuLiChangType"
                            :placeholder="'请选择'"
                            :columns="1"
                            show-name
                            @on-change="this.xiuliTypeChange"
              ></popup-picker>
              <popup-picker class="ChooseInsurance-configure-tab-picker hasBorder"
                            v-if="HcXiuLiChangType[0]!=='-1'&&HcXiuLiChangType.length!==0"
                            title="选择比例"
                            :data="HcXiuLiChangOption"
                            v-model="HcXiuLiChang"
                            :placeholder="'请选择'"
                            :columns="1"
                            show-name
              ></popup-picker>
            </group>
          </swiper-item>
        </swiper>
      </div>
    </div>
    <x-button class="scrm-btn" @click.native="nextStep">下一步</x-button>
  </div>
</template>
<script>
  import {
    ButtonTab,
    ButtonTabItem,
    Cell,
    CheckerItem,
    Checklist,
    Datetime,
    Group,
    PopupPicker,
    Swiper,
    SwiperItem,
    XButton,
    XSwitch
  } from 'vux';
  import outpath from '@constants/outpath';
  import network from '@services';
  import {
    BoLiOption,
    ChengKeOption,
    HcXiuLiChangOption_cn,
    HcXiuLiChangOption_en,
    HuaHenOption,
    SanZheOption,
    SiJiOption
  } from '@constants/config';
  import moment from 'moment';
  import {JSBridge} from "@util";

  export default {
    components: {
      XSwitch,
      Group,
      Cell,
      Datetime,
      ButtonTab,
      ButtonTabItem,
      Swiper,
      SwiperItem,
      CheckerItem,
      Checklist,
      PopupPicker,
      XButton
    },
    data() {
      const {SaveQuote, UserInfo} = this.$route.params.data;
      return {
        // 接口1返回参数
        carInfo: this.$route.params.data,
        // 车型校验拼装值
        carType: '',
        // tab切换index
        tabIndex: 0,
        // swiper高
        swiperHeight: '350px',
        // 交强险switch状态 默认开启
        // jiaoqiang: '1',
        // 商业险switch状态
        // shangye: '1',
        // 交强险起保时间（Unix时间戳格式）单位是秒
        ForceTimeStamp: UserInfo.ForceExpireDate ?
          moment(UserInfo.ForceExpireDate).add(1, 'days').add(1, 'hours').format('YYYY-MM-DD HH:mm') :
          moment().add(1, 'days').add(1, 'hours').format('YYYY-MM-DD HH:ss'),
        // 商业险起保时间（Unix时间戳格式）单位是秒（如果在单商业的情况下 ，此字段必须有值）
        BizTimeStamp: UserInfo.BusinessExpireDate ?
          moment(UserInfo.BusinessExpireDate).add(1, 'days').add(1, 'hours').format('YYYY-MM-DD HH:mm') :
          moment().add(1, 'days').add(1, 'hours').format('YYYY-MM-DD HH:ss'),
        //基本险
        BuJiMianCheSun: SaveQuote.BuJiMianCheSun > 0 ? [SaveQuote.BuJiMianCheSun + ''] : ['0'],//不计免车损
        CheSun: [SaveQuote.CheSun > 0 ? '1' : '0'],//车损
        BuJiMianSanZhe: SaveQuote.BuJiMianSanZhe > 0 ? [SaveQuote.BuJiMianSanZhe + ''] : ['0'],//不计免第三者
        SanZhe: [SaveQuote.SanZhe > 0 ? SaveQuote.SanZhe + '' : '0'],//第三者
        SanZheOption: SanZheOption,//第三者选项
        BuJiMianDaoQiang: SaveQuote.BuJiMianDaoQiang > 0 ? [SaveQuote.BuJiMianDaoQiang + ''] : ['0'],//不计免盗抢险
        DaoQiang: [SaveQuote.DaoQiang > 0 ? '1' : '0'],//盗抢险
        BuJiMianSiJi: SaveQuote.BuJiMianSiJi ? [SaveQuote.BuJiMianSiJi + ''] : ['0'],//不计免司机责任
        SiJi: [SaveQuote.SiJi > 0 ? SaveQuote.SiJi + '' : '0'],//车上乘客（司机险）
        SiJiOption: SiJiOption,//司机责任选项
        BuJiMianChengKe: SaveQuote.BuJiMianChengKe > 0 ? [SaveQuote.BuJiMianChengKe + ''] : ['0'],//不计免乘客
        ChengKeOption: ChengKeOption,
        ChengKe: [SaveQuote.ChengKe > 0 ? SaveQuote.ChengKe + '' : '0'],//乘客
        //附加险
        BuJiMianHuaHen: SaveQuote.BuJiMianHuaHen > 0 ? [SaveQuote.BuJiMianHuaHen + ''] : ['0'],//不计免划痕险
        HuaHen: [SaveQuote.HuaHen > 0 ? SaveQuote.HuaHen + '' : '0'],//划痕险
        HuaHenOption: HuaHenOption,//划痕险选项
        BoLi: [SaveQuote.BoLi > 0 ? '1' : '0'],//玻璃破碎险
        BoLiOption: BoLiOption,//玻璃破碎险选项
        BuJiMianZiRan: SaveQuote.BuJiMianZiRan > 0 ? [SaveQuote.BuJiMianZiRan + ''] : ['0'],//不计免自燃险
        ZiRan: [SaveQuote.ZiRan > 0 ? '1' : '0'],//自燃险
        BuJiMianSheShui: SaveQuote.BuJiMianSheShui > 0 ? [SaveQuote.BuJiMianSheShui + ''] : ['0'],//不计免涉水险
        SheShui: [SaveQuote.SheShui > 0 ? '1' : '0'],//涉水险
        HcSanFangTeYue: [SaveQuote.HcSanFangTeYue > 0 ? SaveQuote.HcSanFangTeYue + '' : '0'],//机动车损失保险无法找到第三方特约险
        HcXiuLiChangType: [SaveQuote.HcXiuLiChangType ? SaveQuote.HcXiuLiChangType + '' : '-1'],//指定修理厂险
        HcXiuLiChang: [SaveQuote.HcXiuLiChang ? SaveQuote.HcXiuLiChang + '' : ''],//指定修理厂险系数
        HcXiuLiChangOption: [],//指定修理厂险系数选项
        QuoteGroup: [SaveQuote.Source],//保险资源枚举列表
      }
    },
    activated() {
      JSBridge({code: 'setTitle', title: '选择险种'});
      if (!Object.keys(this.$route.params).length) {
        return false
      }
      this.carInfo = this.$route.params.data;
      const data = this.carInfo;
      //车型校验拼装
      this.carType = `${data.UserInfo.AutoMoldCode || ''}/${data.UserInfo.ModleName || ''}/${data.UserInfo.VehicleAlias || ''}/${data.UserInfo.ExhaustScale || ''}/${data.UserInfo.SeatCount || ''}/${data.UserInfo.PurchasePrice || ''}/${data.UserInfo.VehicleYear || ''}`;
      this.checkOwnerExist();
    },
    methods: {
      checkCar() {
        // 车辆校验
        const {UserInfo} = this.carInfo;
        let params = {
          LicenseNo: UserInfo.LicenseNo,
          EngineNo: UserInfo.EngineNo,
          CarVin: UserInfo.CarVin,
          MoldName: UserInfo.ModleName,
          CityCode: UserInfo.CityCode,
        };
        network.get(outpath.GET_BH_VEHICLE_INFO, params).then(res => {
          if (res && res.respCode === '0' && res.ok) {
            if(res.data.Items.length===0){
              return this.$vux.toast.show({
                text:'暂时没有查询到相关车型',
                type: 'text',
                width: '60%',
                time: 3000
              })
            }
            this.$router.push({
              name: 'checkCar',
              params: {
                data: this.carInfo,
                checkList: res
              }
            })
          }
        });
      },

      pickerChange(v, checkBox) {
        if (v[0] > 0) {
          this[checkBox] = ['1'];
        } else {
          this[checkBox] = [''];
        }
      },
      xiuliTypeChange(v) {
        if (v[0] === '0') {
          this.HcXiuLiChangOption = HcXiuLiChangOption_cn
        } else if (v[0] === '1') {
          this.HcXiuLiChangOption = HcXiuLiChangOption_en
        }
        this.HcXiuLiChang = [this.HcXiuLiChangOption[1].value];
      },
      validateForm() {
        // 表单校验方法
        let now = new Date().getTime();
        if (!this.ForceTimeStamp) {
          this.$vux.toast.show({
            text: '请选择交强险起保时间',
            type: 'text',
            width: '60%',
            time: 3000
          });
          return false
        }
        if (!this.BizTimeStamp) {
          this.$vux.toast.show({
            text: '请选择商业险起保时间',
            type: 'text',
            width: '60%',
            time: 3000
          });
          return false
        }
        if ((moment(this.ForceTimeStamp).valueOf() - now) < 24 * 60 * 60 * 1000) {
          this.$vux.toast.show({
            text: '请选择正确的交强险起保时间（投保时间在1~90天之内）',
            type: 'text',
            width: '60%',
            time: 3000
          });
          return false
        }
        if ((moment(this.BizTimeStamp).valueOf() - now) < 24 * 60 * 60 * 1000) {
          this.$vux.toast.show({
            text: '请选择正确的商业险起保时间（投保时间在1~90天之内）',
            type: 'text',
            width: '60%',
            time: 3000
          });
          return false
        }
        if ((moment(this.ForceTimeStamp).valueOf() - now) > 90 * 24 * 60 * 60 * 1000) {
          this.$vux.toast.show({
            text: '请选择正确的交强险起保时间（投保时间在1~90天之内）',
            type: 'text',
            width: '60%',
            time: 3000
          });
          return false
        }
        if ((moment(this.BizTimeStamp).valueOf() - now) > 90 * 24 * 60 * 60 * 1000) {
          this.$vux.toast.show({
            text: '请选择正确的商业险起保时间（投保时间在1~90天之内）',
            type: 'text',
            width: '60%',
            time: 3000
          });
          return false
        }
        if (!this.carInfo.UserInfo.PurchasePrice) {
          this.$vux.toast.show({
            text: '您的车辆信息中缺少购置价格，请先进行车型校验',
            type: 'text',
            width: '60%',
            time: 3000
          });
          return false
        }
        let insArr = [
          ...this.CheSun,
          ...this.SanZhe,
          ...this.DaoQiang,
          ...this.SiJi,
          ...this.ChengKe,
          ...this.HuaHen,
          ...this.BoLi,
          ...this.ZiRan,
          ...this.SheShui,
          ...this.HcSanFangTeYue,
          ...this.HcXiuLiChangType,
        ];
        let reduceResult = insArr.reduce((total, cur) => total + Number(cur), 0);
        if (reduceResult < 0) {
          this.$vux.toast.show({
            text: '请选择商业险相关险种',
            type: 'text',
            width: '60%',
            time: 3000
          });
          return false
        }
        return true
      },
      nextStep() {

        if (this.validateForm()) {
          const {UserInfo, SaveQuote} = this.carInfo;
          let params = {
            ...UserInfo,
            ...SaveQuote,
            IsNewCar: UserInfo.IsNewCar || '2',
            ForceTax: 1,
            // BizTimeStamp:(new Date(this.BizTimeStamp).getTime() / 1000)+micSecond,
            // ForceTimeStamp:(new Date(this.BizTimeStamp).getTime() / 1000)+micSecond,
            BizTimeStamp: moment(this.BizTimeStamp).valueOf() / 1000,
            ForceTimeStamp: moment(this.ForceTimeStamp).valueOf() / 1000,
            BoLi: this.BoLi[0],
            BuJiMianCheSun: this.BuJiMianCheSun[0],
            BuJiMianDaoQiang: this.BuJiMianDaoQiang[0],
            BuJiMianSanZhe: this.BuJiMianSanZhe[0],
            BuJiMianChengKe: this.BuJiMianChengKe[0],
            BuJiMianSiJi: this.BuJiMianSiJi[0],
            BuJiMianHuaHen: this.BuJiMianHuaHen[0],
            BuJiMianSheShui: this.BuJiMianSheShui[0],
            BuJiMianZiRan: this.BuJiMianZiRan[0],
            SheShui: this.SheShui[0],
            HuaHen: this.HuaHen[0],
            SiJi: this.SiJi[0],
            ChengKe: this.ChengKe[0],
            CheSun: this.CheSun[0],
            DaoQiang: this.DaoQiang[0],
            SanZhe: this.SanZhe[0],
            ZiRan: this.ZiRan[0],
            HcSanFangTeYue: this.HcSanFangTeYue[0],
            HcXiuLiChang: this.HcXiuLiChang[0],
            interfaceData: this.carInfo,
            MoldName: UserInfo.ModleName
          };
          if (this.HcXiuLiChangType[0] !== '-1' && this.HcXiuLiChangType.length !== 0) {
            params.HcXiuLiChangType = this.HcXiuLiChangType[0];
          } else {
            params.HcXiuLiChangType = '-1'
          }
          this.$router.push({
            name: 'contacts',
            params: params
          })
        }
      },
      checkOwnerExist() {
        const {UserInfo} = this.carInfo;
        let params = {
          page: 1,
          pageSize: 10,
          plateNum: UserInfo.LicenseNo
        };
        if (UserInfo.LicenseNo === UserInfo.CarVin) {
          delete params.plateNum;
          params.vinNo = UserInfo.CarVin;
        }
        return network.get(outpath.CHECK_CAR_OWNER_EXIST, params).then(res => {
          if (res && res.data) {
            if (res.data.plateNumId || res.data.vinNoId) {
              this.carInfo.UserInfo.plateNumId = res.data.plateNumId || res.data.vinNoId;
            } else {
              let params = {
                brandModel: UserInfo.ModleName,
                contactWay: UserInfo.InsuredMobile,
                docInfo: UserInfo.CredentislasNum,
                engineNum: UserInfo.EngineNo,
                ignoreValidFlag: 1,
                initialDate: UserInfo.RegisterDate,
                ownerName: UserInfo.LicenseOwner,
                plateNum: UserInfo.LicenseNo,
                viExp: UserInfo.BusinessExpireDate,
                vinNo: UserInfo.CarVin,
              };
              network.post(outpath.INSERT_CAR_OWNER, params).then(res => {
                if (res && res.data) {
                  this.carInfo.UserInfo.plateNumId = res.data;
                }
              })
            }
          }
        })
      }
    }
  }
</script>
<style lang="less">
  @import "./ChooseInsurance";
</style>
