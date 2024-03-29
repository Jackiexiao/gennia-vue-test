# 快速开始

访问 [gennia.cn](https://gennia.cn) 或者 [gennia.io](https://gennia.io)

## 创建房间

分享链接，邀请你的好友加入房间

## 更多

Gennia 已支持自定义地图！创建属于你的地图，与好友一起玩耍吧！

# 游玩操作

## 方向键 / WASD

控制兵力移动。每次移动会从当前格子中抽调当前格子兵力数 $-1$ 的兵力放置在新的位置上（除非激发了 50%）。

## 50%

两次点击一个你拥有的格子 / `Z` 键可以激发，可以抽取当前格子兵力数 $/2$ 下取整的兵力放置在新的位置上。

## 攻占

如果放置在新位置上的兵力数 > 原有兵力数，该格子被攻占。

特别地，如果该格子是另一个玩家的**王城**(King)，该玩家出局，该玩家所有领土兵力数 $/2$，您获得该玩家所有的领土。

## 操作序列

由于 1 游戏刻只能进行一次攻击操作，所以多余的输入操作会被存入操作序列，并以**箭头轨道**的形式显示在地图中。

每 1 次游戏更新时，系统会向服务器提交一次操作，并将它从操作序列删除。

你因而可以提前规划你的路径。

## E 键

撤销**操作序列**的**最后一步**

## Q 键

清空**操作序列**

## G / K 键

定位到你的 Generals / King 方块

## 1 / 2 / 3 键

缩放地图到预设大小

## 滚轮

缩放地图

## ESC 键

投降 或 退出游戏

## Enter 回车键

定位到聊天框，发送聊天消息

# 地图和地形

## 地图大小 (Width / Height)

::: warning 注意
根据编写者的习惯，这里的 $width$ 为地图的竖向格子数，$height$ 为地图的横向格子数（（
:::

取值：$0\sim 1$。

计算公式：

$$val_w=\lfloor kings \times 2.7 + 10 \times width\rfloor$$

其中 $kings$ 为玩家数量。 $height$ 计算公式类似。

## 地形 (Terrain)

一共有 `King`、`Plain`、`Mountain`、`City`、 `Swamp` 五类。

其中 `Mountain`、`City`、 `Swamp`  生成参数可调。

Mountain 计算公式：

$$val_m=\lfloor \frac{1}{4}\times size \times \frac{mountain}{mountain+city}\rfloor$$

City 计算公式：

$$val_c=\lfloor \frac{1}{6}\times size \times \frac{city}{mountain+city}\rfloor$$

**特别地**，当 $mountain+city=0$ 时，$val_m=val_c=0$

Swamp 计算公式：

$$val_s=\lfloor \frac{1}{3}(size-val_m-val_c)\times swamp\rfloor$$

**其中** $size=val_w\times val_h$

# 游戏速度 (Game Speed)

取值：$0.25, 0.5, 0.75, 1, 2, 3, 4$

一个游戏刻 = $500ms \times val^{-1}$

`Turn` 跳动的周期 = 游戏刻 $\times 2$

`King/City` 增兵的周期 = 游戏刻 $\times 2$

已占领的 `Plain` 增兵的周期 = 游戏刻 $\times 50$
