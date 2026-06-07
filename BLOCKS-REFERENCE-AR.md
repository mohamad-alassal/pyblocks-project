# مرجع الكتل المتاحة 📖

## 🎲 Random (مكتبة العشوائية)

| الكتلة | الوصف | مثال الاستخدام | الكود الناتج |
|--------|-------|----------------|--------------|
| **random.randint** | رقم عشوائي صحيح بين قيمتين | من 1 إلى 10 | `random.randint(1, 10)` |
| **random.choice** | اختيار عنصر عشوائي من قائمة | اختر من [1,2,3] | `random.choice([1, 2, 3])` |
| **random.random** | رقم عشري بين 0 و 1 | - | `random.random()` |

### أمثلة عملية:
```python
# مثال 1: رمي نرد
dice = random.randint(1, 6)
print('رميت:', dice)

# مثال 2: اختيار لون عشوائي
colors = ['أحمر', 'أزرق', 'أخضر']
chosen = random.choice(colors)
print('اللون المختار:', chosen)
```

---

## ⏰ Time (مكتبة الوقت)

| الكتلة | الوصف | مثال الاستخدام | الكود الناتج |
|--------|-------|----------------|--------------|
| **time.sleep** | توقف البرنامج لفترة معينة | انتظر 2 ثانية | `time.sleep(2)` |
| **time.time** | الوقت الحالي بالثواني منذ 1970 | - | `time.time()` |

### أمثلة عملية:
```python
# مثال: العد التنازلي
for i in range(3, 0, -1):
    print(i)
    time.sleep(1)
print('انطلق!')

# مثال: قياس وقت التنفيذ
start = time.time()
# ... كود معين ...
end = time.time()
print('استغرق:', end - start, 'ثانية')
```

---

## 🔢 Math (الرياضيات المتقدمة)

| الكتلة | الوصف | مثال | الكود الناتج |
|--------|-------|------|--------------|
| **math.sqrt** | الجذر التربيعي | جذر 16 | `math.sqrt(16)` → 4.0 |
| **math.pow** | الأس | 2 أس 3 | `math.pow(2, 3)` → 8.0 |
| **math.floor** | تقريب للأسفل | floor(3.7) | `math.floor(3.7)` → 3 |
| **math.ceil** | تقريب للأعلى | ceil(3.2) | `math.ceil(3.2)` → 4 |
| **math.pi** | ثابت باي | π | `math.pi` → 3.14159... |

### أمثلة عملية:
```python
# مثال 1: محيط الدائرة (2πr)
radius = 5
circumference = 2 * math.pi * radius
print('المحيط:', circumference)

# مثال 2: مساحة الدائرة (πr²)
area = math.pi * math.pow(radius, 2)
print('المساحة:', area)

# مثال 3: نظرية فيثاغورس (c = √(a² + b²))
a = 3
b = 4
c = math.sqrt(math.pow(a, 2) + math.pow(b, 2))
print('الوتر:', c)  # الناتج: 5.0
```

---

## 📅 Datetime (التاريخ والوقت)

| الكتلة | الوصف | مثال | الكود الناتج |
|--------|-------|------|--------------|
| **datetime.now** | التاريخ والوقت الحالي | - | `datetime.now()` |
| **استخرج السنة** | السنة من تاريخ | من now | `datetime.now().year` |
| **استخرج الشهر** | الشهر من تاريخ | من now | `datetime.now().month` |
| **استخرج اليوم** | اليوم من تاريخ | من now | `datetime.now().day` |

### أمثلة عملية:
```python
# مثال 1: عرض التاريخ الكامل
now = datetime.now()
print('السنة:', now.year)
print('الشهر:', now.month)
print('اليوم:', now.day)

# مثال 2: حساب العمر (مبسط)
birth_year = 2000
current_year = datetime.now().year
age = current_year - birth_year
print('عمرك:', age, 'سنة')
```

---

## 🛠️ Built-in Functions (الدوال المدمجة)

| الكتلة | الوصف | مثال | الكود الناتج |
|--------|-------|------|--------------|
| **input** | قراءة مدخل من المستخدم | اقرأ: "اسمك؟" | `input("اسمك؟")` |
| **int** | تحويل إلى عدد صحيح | int("123") | `int("123")` → 123 |
| **float** | تحويل إلى عدد عشري | float("3.14") | `float("3.14")` → 3.14 |
| **str** | تحويل إلى نص | str(123) | `str(123)` → "123" |
| **len** | طول النص/القائمة | len("Hello") | `len("Hello")` → 5 |
| **range** | إنشاء مدى | من 0 إلى 10 | `range(0, 10)` |

### أمثلة عملية:
```python
# مثال 1: جمع رقمين من المستخدم (مع input)
# ملاحظة: input قد لا يعمل في بيئة الخادم
num1 = int(input("الرقم الأول: "))
num2 = int(input("الرقم الثاني: "))
result = num1 + num2
print("الناتج:", result)

# مثال 2: تحويل الأنواع
text = "123"
number = int(text)
result = number + 100
print(result)  # 223

# مثال 3: len() مع النصوص
message = "مرحباً بك"
length = len(message)
print("عدد الأحرف:", length)

# مثال 4: range() في التكرار
for i in range(1, 6):
    print(i)  # يطبع: 1, 2, 3, 4, 5
```

---

## 🎯 الكتل الأساسية من Blockly

### Logic (المنطق)
- `if` / `if-else` / `if-else if-else`
- `=`, `≠`, `<`, `>`, `≤`, `≥`
- `and`, `or`
- `not`
- `true`, `false`, `null`

### Loops (التكرار)
- `repeat X times` - كرر X مرة
- `while` / `until` - كرر طالما/حتى
- `for each` - لكل عنصر في قائمة
- `break` / `continue` - أوقف/استمر

### Math (رياضيات أساسية)
- `+`, `-`, `×`, `÷`
- `sin`, `cos`, `tan`
- `جذر`, `أس`, `قيمة مطلقة`
- `min`, `max`
- `rounding` (تقريب)

### Text (النصوص)
- إنشاء نص
- دمج نصوص
- طول النص
- نص فارغ؟
- تغيير حالة الأحرف (كبيرة/صغيرة)
- `print()` - طباعة

### Lists (القوائم)
- إنشاء قائمة فارغة
- إنشاء قائمة بعناصر
- طول القائمة
- قائمة فارغة؟
- إضافة/حذف عنصر
- فرز القائمة

### Variables (المتغيرات)
- إنشاء متغير جديد
- تعيين قيمة
- تغيير قيمة

### Functions (الدوال)
- إنشاء دالة جديدة
- إرجاع قيمة
- دالة بمعاملات

---

## 💡 نصائح للاستخدام

### 1. الاستيراد التلقائي
عند استخدام أي كتلة من مكتبة Python، يُضاف السطر المناسب تلقائياً:
```python
import random      # تُضاف تلقائياً عند استخدام random
import time        # تُضاف تلقائياً عند استخدام time
import math        # تُضاف تلقائياً عند استخدام math
from datetime import datetime  # تُضاف تلقائياً
```

### 2. التحويل بين الأنواع
احرص على تحويل الأنواع عند الحاجة:
```python
# خطأ: لا يمكن جمع نص مع رقم
age = 25
print("عمري " + age)  # ❌ خطأ

# صحيح: حول الرقم إلى نص أولاً
age = 25
print("عمري " + str(age))  # ✅ صحيح
```

### 3. استخدام المتغيرات
احفظ القيم المهمة في متغيرات:
```python
# بدلاً من تكرار الحساب
print(math.sqrt(16))
print(math.sqrt(16) + 1)

# استخدم متغير
result = math.sqrt(16)
print(result)
print(result + 1)
```

### 4. الترتيب مهم
في العمليات الحسابية، استخدم الأقواس لتوضيح الأولوية:
```python
# غير واضح
result = 2 + 3 * 4  # 14 أم 20؟

# واضح
result = 2 + (3 * 4)  # 14
result = (2 + 3) * 4  # 20
```

---

## 🚀 مشاريع مقترحة

### مشروع مبتدئ: آلة حاسبة
```python
num1 = 10
num2 = 5
print('الجمع:', num1 + num2)
print('الطرح:', num1 - num2)
print('الضرب:', num1 * num2)
print('القسمة:', num1 / num2)
```

### مشروع متوسط: حاسبة الدائرة
```python
import math

radius = 7
circumference = 2 * math.pi * radius
area = math.pi * math.pow(radius, 2)

print('نصف القطر:', radius)
print('المحيط:', circumference)
print('المساحة:', area)
```

### مشروع متقدم: لعبة تخمين
```python
import random

secret = random.randint(1, 10)
# في التطبيق الحقيقي، استخدم input()
guess = 5

if guess == secret:
    print('مبروك! خمنت الرقم!')
elif guess < secret:
    print('الرقم أكبر')
else:
    print('الرقم أصغر')

print('الرقم السري كان:', secret)
```

---

**الآن أنت جاهز للبدء! 🎉**
