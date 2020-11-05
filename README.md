### Heart

### 接口文档
#### 获取授权信息
地址: api/token/inform
参数: code string 微信授权code码
返回值:
openid: string 用户的唯一标识
nickname: string 用户昵称
sex: number 用户的性别，值为1时是男性，值为2时是女性，值为0时是未知
province: string 用户个人资料填写的省份
city: string 普通用户个人资料填写的城市
country: string 国家，如中国为CN
headimgurl: string 用户头像，最后一个数值代表正方形头像大小（有0、46、64、96、132数值可选，0代表640*640正方形头像），用户没有头像时该项为空。若用户更换头像，原有头像URL将失效。

#### 获取首页广告数据
地址: api/home/advert
参数: 
返回值: Array
id: int 广告id
sort: int 广告排序
thumb: string 广告大图
route: string 跳转ID

#### 获取首页tab数据
地址: api/home/tabs
参数: 
返回值: Array
id: int 商品列表id
price: int 商品列表价格
tally: string 商品列表标签
thumb: string 商品列表大图
title: string 商品列表标题
type: int 商品所属栏目 0 1
unique: string 商品唯一ID

#### 获取商品详情数据
地址: api/detail/inform
参数: unique: string 商品唯一ID
返回值: Object
figure: Array
    id: int banner图id
    unique: string 商品唯一ID
    figure: string 商品详情banner图
inform: Object
    id: int 商品详情id
    price: int 商品详情价格
    title: string 商品详情标题
    unique: string 商品唯一ID
thumb: Array
    id: int 商品详情描述id
    describe: string 商品详情描述大图
    unique: string 商品唯一ID

#### 获取商品详情Sku数据
地址: api/detail/sku
参数: unique: string 商品唯一ID
返回值: Array
k: string 规格类型名称
k_s: string 规格类型id
v: Array
    id: int 规格名称id
    name: string 规格名称

#### 获取用户收货地址列表
地址: api/address/list
参数: openid: string 微信用户openid
返回值: Array
    id: int 收货地址id
    name: string 姓名
    tel: string 手机号
    province: string 省份
    city: string 城市
    county: string 区县
    road: string 街道
    address: string 收货地址
    isDefault: boolean 是否默认地址

#### 更新用户默认收货地址
地址: api/address/update
参数: 
id: int 收货地址id
openid: string 微信用户openid
返回值: 

#### 新增收货地址
地址: api/address/add
参数: 
openid: string 微信用户openid
name: string 姓名
phone: string 手机号
province: string 省份
city: string 城市
county: string 区县
road: string 街道
返回值: 

#### 编辑收货地址
地址: api/address/edit
参数: 
id: int 收货地址id
openid: string 微信用户openid
name: string 姓名
phone: string 手机号
province: string 省份
city: string 城市
county: string 区县
road: string 街道
返回值: 

#### 删除收货地址
地址: api/address/del
参数: 
id: int 收货地址id
返回值:

#### 查询默认收货地址
地址: api/order/address
参数: 
openid: string 微信用户openid
返回值:
id: int 默认收货地址id
address: string 具体收货地址
contact: string 收件人姓名和手机号