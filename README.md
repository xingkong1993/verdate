# verdate
### 插件说明
ver-date.js是一款时间选择器插件，该插件提供了年月日选择器和年月日时分秒选择器两种展示方式，ver-date时间选择器插件使用方便快捷，只需通过new一个对象即可实现时间控件
### 使用示例
时间控件元素必须存在id
~~~
<input type="text" autocomplete="off" id="times" value="2019-01-01" data-dateItems="date" data-date-start="2019-01-01"
       data-date-end="2019-12-31" readonly>
<input type="text" autocomplete="off" id="times1" value="2019-03-31 00:00:00" data-dateItems="dateTime" readonly>
new verDate();
~~~
### 参数说明
1. data-dateItems：ver-date实例化控件标签，包含date和dateTime两个值，不填则默认为date
    1. date显示的参数为：yyyy-mm-dd
    2. dateTime显示的参数为：yyyy-mm-dd hh:ii:ss
2. data-date-start/data-date-end：开始/结束时间，当出现该参数时ver-date只显示参数周期内的时间。格式为：yyyy-mm-dd
### 示例图片
![https://github.com/xingkong1993/image_relesess/blob/master/verdate1.jpg](https://github.com/xingkong1993/image_relesess/blob/master/verdate1.jpg)
![https://github.com/xingkong1993/image_relesess/blob/master/verdate2.jpg](https://github.com/xingkong1993/image_relesess/blob/master/verdate2.jpg)

### 版权信息
 > Copyright © 2018 by [搬砖的小白](https://www.xincheng-blog.cn)  
 > All rights reserved。