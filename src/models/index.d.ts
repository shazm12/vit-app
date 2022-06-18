import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type PlacesMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Places {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly category: string;
  readonly lat?: number | null;
  readonly lng?: number | null;
  readonly imgURL?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Places, PlacesMetaData>);
  static copyOf(source: Places, mutator: (draft: MutableModel<Places, PlacesMetaData>) => MutableModel<Places, PlacesMetaData> | void): Places;
}