# Введение #

HTML виджет предназначен для отображения счетчиков с высокой степенью персонализации, то есть, можно достаточно произвольно настраивать цвет, размер, расположение различных счетчиков и их комбинаций на виджете. Для этого в виджете есть настройка HTML шаблона.

Чтобы выбрать HTML виджет, надо при добавлении нового виджета в качестве типа виджета выбрать "Универсальный HTML".

Шаблон выглядит примерно так:
```
  <big>(@1)</big><br/>
  <small>(@1*m) / (@1*d)</small>
```

При этом посередине виджета будет показано значение счетчика номер 1, а под ним изменение этого счетчика за месяц и за день.

# Подробности #

Виджет поддерживает не все тэги HTML. Список поддерживаемых тэгов:
`<b>, <big>, <blockquote>, <br>, <cite>, <dfn>, <em>, <font color="..." face="...">, <h1>, <h2>, <h3>, <h4>, <h5>, <h6>, <i>, <p>, <small>, <strike>, <strong>, <sub>, <sup>, <tt>, <u>`. Кроме того, очень ограниченно поддерживается тэг `<table>`, с помощью которого счетчики можно отображать в горизонтальной строке.

`<table>` может содержать только **одну** строку и **не более 7** ячеек. Содержимое ячеек будет выравнено по центру ячейки.

Места, в которых необходимо отображать счетчики помечаются маркерами вида `(@N)`, где `N` - номер настроенного в виджете счетчика от 0 до 6 (при настройке виджета пользователь имеет возможность указать счетчик, который должен отображаться для каждого номера 0-6). При этом для ячеек таблицы `<td>` предусмотрен нестандартный атрибут `ifavailable="N,M,..."`, который позволяет не отображать ячейку, если пользователь не настроил ни один из указанных в значении атрибута счетчиков.

Изменения счетчика номер N помечаются маркерами вида `(@NxT)`, где `x` - тип изменения, а `T` -  период времени, за которое накапливается изменение.

**Типы изменений**:
  * `*` - все изменения,
  * `-` - только изменения в сторону уменьшения (например, когда интересны только траты со счета, а не пополнения),
  * `+` - только изменения в сторону увеличения (например, когда интересны только пополнения счета, а не траты с него).

**Периоды времени**:
  * `a` - последнее ненулевое изменение счетчика
  * `l` - изменения с момента последнего запроса значения счетчика
  * `d` - изменения с начала дня
  * `w` - изменения с начала недели
  * `m` - изменения с начала месяца
  * `y` - изменения с начала года

Например, `(@3+y)` означает сумму всех увеличений счетчика номер 3 с начала года, а `(@5-l)` означает уменьшение счетчика номер 5 с момента последнего запроса.

# Дополнительные возможности #

  * Вы можете вывести название счетчика вместо его значения, например `(@0n)`, или вывести значение счетчика без единиц измерений, например `(@0_)`
  * Вы можете использовать модификаторы отображения счетчиков. Модификаторы задаются следующим способом: `(@0n!ellipsize:10)` - к имени основного счетчика будет применен модификатор `ellipsize` с параметром 10, который оставит только первый 10 символов от имени счетчика. Доступны следующие модификаторы:
    * `ellipsize:N` - обрезание входящей строки до N первых символов.
    * `colorize` - если входящая строка начинается на `+`, то она будет выведена цветом положительных изменений (по умолчанию, зеленым), если на `-`, то цветом отрицательных изменений (по умолчанию, красным). Будьте внимательны, в силу ограничений Android вложенные `<font color="#...">` не работают, поэтому убедитесь, что модификатор `colorize` не применяется внутри тэга `<font>`. Пример применения: `(@0*m!colorize)` - показать изменения основного счетчика за месяц, подсветив положительные и отрицательные изменения цветом.
  * `<font size="">` не поддерживается, но можно достаточно произвольно менять размер текста, обрамляя его в тэги `<big>` и `<small>`, причем допускается их многократное вкладывание.
  * Конструкция `<if available="0123">text</if>` выведет `text`, только если в настройках виджета выбран хоть один из перечисленных в атрибуте `available` счетчиков.

# Редактор шаблона #

На телефоне редактировать шаблон не очень удобно, гораздо удобнее сделать шаблон для себя в редакторе, а потом перенести его в телефон. Ниже представлен редактор, который позволяет редактировать шаблон и предварительно просматривать результат, а затем закодировать его в QR код, который может быть считан AnyBalance. Для считывания QR кода при настройке HTML виджета вызовите контекстное меню для настройки "HTML шаблон" и выберите меню "Штрих-код".

Вы также можете переслать кому-то ссылку на ваш штрихкод, ссылка содержится в заголовке окна, показывающего QR-код.

&lt;wiki:gadget url="http://any-balance-providers.googlecode.com/svn/misc/gadgets/htmlwidget/gadgetHtmlWidget.xml" height="700" width="700" border="0" /&gt;