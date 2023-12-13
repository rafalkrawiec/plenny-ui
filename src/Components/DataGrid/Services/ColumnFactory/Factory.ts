import { NumberFactory } from './Columns/NumberFactory';
import { type WithEdit, type FactoryEditOptions, edit } from './Concerns/Edit';
import { TextFactory } from './Columns/TextFactory';
import { header, type FactoryHeaderOptions, type WithHeader } from './Concerns/Header';
import { data, type FactoryDataOptions, type WithData } from './Concerns/Data';
import { PrimaryKeyFactory } from './Columns/PrimaryKeyFactory';
import { sort, type FactorySortOptions, type WithSort } from './Concerns/Sort';
import { resize, type FactoryResizeOptions, type WithResize } from './Concerns/Resize';
import { base, type FactoryBaseOptions, type WithBase } from './Concerns/Base';
import { filter, type FactoryFilterOptions, type WithFilter } from './Concerns/Filter';
import { DateTimeFactory } from './Columns/DateTimeFactory';
import { DictionaryFactory } from './Columns/DictionaryFactory';
import { EmailFactory } from './Columns/EmailFactory';
import { ForeignKeyFactory } from './Columns/ForeignKeyFactory';
import { PhoneFactory } from './Columns/PhoneFactory';
import { CodeFactory } from './Columns/CodeFactory';
import { BooleanFactory } from './Columns/BooleanFactory';
import { PhotoFactory } from './Columns/PhotoFactory';
import { MetaFactory } from './Columns/MetaFactory';
import { CollectionFactory } from "./Columns/CollectionFactory";
import { MoneyFactory } from './Columns/MoneyFactory';

export type FactoryOptions =
  & FactoryBaseOptions
  & FactoryHeaderOptions
  & FactoryResizeOptions
  & FactoryDataOptions
  & FactorySortOptions
  & FactoryEditOptions
  & FactoryFilterOptions;

export type FactoryDefaults = Omit<FactoryOptions, 'key' | 'name'>;

export type Column =
  & WithBase
  & WithHeader
  & WithResize
  & WithData
  & WithSort
  & WithEdit
  & WithFilter;

export const Factory = {
  Boolean: BooleanFactory,
  Code: CodeFactory,
  DateTime: DateTimeFactory,
  Dictionary: DictionaryFactory,
  Meta: MetaFactory,
  Email: EmailFactory,
  ForeignKey: ForeignKeyFactory,
  Number: NumberFactory,
  Money: MoneyFactory,
  Phone: PhoneFactory,
  Photo: PhotoFactory,
  PrimaryKey: PrimaryKeyFactory,
  Text: TextFactory,
  Collection: CollectionFactory,
};

export function make(options: FactoryOptions, defaults: FactoryDefaults): Column {
  return {
    ...base(options, defaults),
    ...header(options, defaults),
    ...data(options, defaults),
    ...resize(options, defaults),
    ...edit(options, defaults),
    ...sort(options, defaults),
    ...filter(options, defaults),
  };
}
