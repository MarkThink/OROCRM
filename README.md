OROCRM
======

OROCRM安装非常不容易，官方提供的文件有四个GIT库，基于的symfony版本是2.3的，现在框架已经升级到2.5了。
为此我花了近一周的时间，查阅了大量的资料反复的试验，终于搭建起来了。
原来的安装包结构非常不合理，所有第三方的Bundles文件与Symfony框架Bundle混合在一起，
不利于框架的整体升级，所以我特别把这些第三方包提取到vendor内的bundles文件夹内。
安装非常方便只需要在命令行输入下面的命令即可： 

php app/console oro:install --env prod --timeout 1000 --force 

前提条件是您需要先创建好数据库，并更新好数据库配置文件parameters.yml
