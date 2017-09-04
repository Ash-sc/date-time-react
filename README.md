# date-range-for-react
A date time picker for react.

## install:
```
npm i date-time-react
```
## Usage
```
...
import DateTime from 'date-time-react';
...
render() {
  return (
    <DateTime
      startDate={this.state.startDate}
      endDate={this.state.endDate}
      changeStartDate={date => this.setState({ startDate: date })}
      changeEndDate={date => this.setState({ endDate: date })}
    />
  );
}
```

## Demo:


## API Reference

* **Properties:**
  * `date` - date string representing the date selected.
    * **Optional**
    * **Type:** `string`
    * **Example:** `"2017-08-31", "2017-08-31 12:00", "1504251766036", `
  * `minDate` - date string representing the min date can be chosen.
    * **Optional**
    * **Type:** `string`
    * **Example:** `same as above`
  * `maxDate` - date string representing the max date can be chosen.
    * **Optional**
    * **Type:** `string`
    * **Example:** `same as above`
  * `changeDate` - date change callback function.
      * **Optional**
      * **Type:** `function`
      * **Callback Arguments:**
      * `date` - date string representing the selected value.
              * **Type:** `String`
              * **Example:** `"2017-08-11 12:12", "1504251766036"` dependence on the `format` value
  * `format` - format of date callback (not text input format).
      * **Optional**
      * **Default** `"x"`
      * **Type:** `string`
      * **Example:** `"x", "X", "YYYY-MM-DD"` Same with format option in [moment.js](https://momentjs.com/docs/#/displaying/format/)
  * `placeholder` - placeholder of start date and end date input.
      * **Optional**
      * **Default** `"YYYY-MM-DD HH:mm"`
      * **Type:** `string`
      * **Example:** `"年-月-日 时:分"`
  * `lang` - language.
      * **Optional**
      * **Default** `"en"`
      * **Type:** `string`
      * **value:** `"en" or "zh-cn"`
  * `needTime` - sync two calender selector.
      * **Optional**
      * **Default** `false`
      * **Type:** `boolean`
      * **value:** `false、true`
        
        


## PS:
If you got an error such as:
```
ERROR in ./~/font-awesome/fonts/fontawesome-webfont.woff2?v=4.4.0
...
You may need an appropriate loader to handle this file type
```
just change your webpack config as blow:
```
      {
        test: /\.(woff|woff2|eot|ttf|svg)(\?\S*)?$/,
        loader: 'url?limit=100000&name=[name].[ext]',
      }
```