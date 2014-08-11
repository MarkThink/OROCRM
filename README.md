OROCRM
======

OROCRM安装非常不容易，官方提供的文件有四个GIT库，基于的symfony版本是2.3的，现在框架已经升级到2.5了。
为此我花了近一周的时间，查阅了大量的资料反复的试验，终于搭建起来了。

原来的安装包结构非常不合理，所有第三方的Bundles文件与Symfony框架Bundle混合在一起，不利于框架的整体升级，所以我特别把这些第三方包提取到vendor内的bundles文件夹内。

安装非常方便只需要在命令行输入下面的命令即可： 
```command
php app/console oro:install --env prod --timeout 1000 --force 
```

前提条件是您需要先创建好数据库，并更新好数据库配置文件parameters.yml

主要修改的文件
--------------
[Oro/Bundle/LocaleBundle/DependencyInjection/Configuration.php]
```php
    'language'=> ['value' => null],
    'country'=> ['value' => null],
    'currency'=> ['value' => null],
```
替换为
----
```php
    'language'=> ['value' => DEFAULT_LANGUAGE],
    'country'=> ['value' => DEFAULT_COUNTRY],
    'currency'=> ['value' => DEFAULT_CURRENCY],
```
[Oro/Bundle/SecurityBundle/Request/ParamConverter/DoctrineParamConverter.php]
```php
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ConfigurationInterface;
public function apply(Request $request, ConfigurationInterface $configuration)
```
替换为
----
```php
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
public function apply(Request $request, ParamConverter $configuration)
```

# OroCRM Application

Welcome to OroCRM the Open Source Customer Relationship Management (CRM) application.

## Requirements

OroCRM is a Symfony 2 based application with the following requirements:

* PHP 5.4.4 or above
* PHP 5.4.4 or above with command line interface
* PHP Extensions:
    * GD
    * Mcrypt
    * JSON
    * ctype
    * Tokenizer
    * SimpleXML
    * PCRE
    * ICU
* MySQL 5.1 or above

## Installation instructions

OroCRM uses [Composer][1] to manage package dependencies, this is the a recommended way to install OroCRM.

- If you don't have Composer yet, download it and follow the instructions on http://getcomposer.org/
or just run the following command:

```bash
curl -s https://getcomposer.org/installer | php
```

- Clone https://github.com/orocrm/crm-application.git OroCRM project with:

```bash
git clone http://github.com/orocrm/crm-application.git
```


- Make sure that you have [NodeJS][4] installed

- Install OroCRM dependencies with composer. If installation process seems too slow you can use "--prefer-dist" option.
  Go to crm-application folder and run composer installation:

```bash
php composer.phar install --prefer-dist
```

- Create the database with the name specified on previous step (default name is "oro_crm").

- Install application and admin user with Installation Wizard by opening install.php in the browser or from CLI:

```bash  
php app/console oro:install --env prod
```

- Enable WebSockets messaging

```bash
php app/console clank:server --env prod
```

- Configure crontab or scheduled tasks execution to run command below every minute:

```bash
php app/console oro:cron --env prod
```
 
**Note:** ``app/console`` is a path from project root folder. Please make sure you are using full path for crontab configuration or if you running console command from other location.

## Installation notes

Installed PHP Accelerators must be compatible with Symfony and Doctrine (support DOCBLOCKs).

Note that the port used in Websocket must be open in firewall for outgoing/incoming connections

Using MySQL 5.6 on HDD is potentially risky because of performance issues.

Recommended configuration for this case:

    innodb_file_per_table = 0

And ensure that timeout has default value

    wait_timeout = 28800

See [Optimizing InnoDB Disk I/O][3] for more


## Loading Demo Data using command line

To load sample data you need to run console command

```bash
php app/console oro:migration:data:load --fixtures-type=demo --env=prod
```

## Web Server Configuration

OroCRM application is based on symfony standard application so web server cofiguration recomendation are the [same][5].

[1]:  http://symfony.com/doc/2.3/book/installation.html
[2]:  http://getcomposer.org/
[3]:  http://dev.mysql.com/doc/refman/5.6/en/optimizing-innodb-diskio.html
[4]:  https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager
[5]:  http://symfony.com/doc/2.3/cookbook/configuration/web_server_configuration.html
