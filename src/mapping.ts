import {
  json,
  Bytes,
  dataSource,
  BigInt,
  BigDecimal,
  TypedMap,
  JSONValue,
  log,
  JSONValueKind,
} from "@graphprotocol/graph-ts";
import { TokenMetadata } from "../generated/schema";

function getFromObjArray(arr: JSONValue[], key: string): JSONValue | null {
  // Validate the array
  if (!Array.isArray(arr)) return null;

  for (let i = 0; i < arr.length; i++) {
    const obj = arr[i];
    if (obj) {
      const value = obj.toObject();

      const keyValue = value.get(key);
      log.error("Value: {} {}", [keyValue ? keyValue.toString() : "null", key]);
      if (keyValue !== null) {
        return keyValue;
      }
    }
  }

  return null;
}

export function handleMetadata(content: Bytes): void {
  let tokenMetadata = new TokenMetadata(dataSource.stringParam());
  const value = json.fromBytes(content).toObject();
  if (value) {
    const image = value.get("image");
    const content = value.get("content");
    const name = value.get("name") || value.get("title");
    const description = value.get("description");
    const channel = value.get("channel");
    const contentType = value.get("contentType");
    const contentHash = value.get("content_hash");
    const attributes = value.get("attributes");
    const thumbnail = value.get("thumbnail");

    tokenMetadata.content = image
      ? image.toString()
      : content
      ? content.toString()
      : "";
    tokenMetadata.name = name ? name.toString() : "";
    tokenMetadata.description = description ? description.toString() : "";
    tokenMetadata.channel = channel ? channel.toString() : "";
    tokenMetadata.contentType = contentType ? contentType.toString() : "";
    tokenMetadata.contentHash = contentHash ? contentHash.toString() : "";
    tokenMetadata.thumbnail = thumbnail ? thumbnail.toString() : "";

    // new metadata from attributes
    if (attributes) {
      const attributesArray = attributes.toArray();

      // Assign the name and image object to the tokenMetadata.name and tokenMetadata.image fields. Then, create an attributesArray variable that will be used to store the attributes object as an array. Converting to an array allows us to first loop through the array with the `switch` statement below, then assign the trait_type and value to the tokenMetadata fields.
      log.error("Attributes: {}", [tokenMetadata.id]);

      if (attributesArray) {
        for (let i = 0; i < attributesArray.length; i++) {
          const attributeObject = attributesArray[i].toObject();
          const traitType = attributeObject.get("trait_type");
          const value = attributeObject.get("value");

          if (!traitType || !value || traitType.kind != JSONValueKind.STRING) {
            log.error("Trait type or value is null", []);
            continue;
          }

          const key = traitType.toString();
          const stringValue =
            value.kind == JSONValueKind.STRING
              ? value.toString()
              : value.toBigInt().toString();
          const isNumber = value.kind == JSONValueKind.NUMBER;

          if (key == "Application") {
            tokenMetadata.application = stringValue;
          } else if (key == "Channel") {
            tokenMetadata.channel = stringValue;
          } else if (key == "Content Type") {
            tokenMetadata.contentType = stringValue;
          } else if (key == "Duration (sec)") {
            tokenMetadata.duration = isNumber
              ? I32.parseInt(stringValue)
              : I32.parseInt(value.toString());
          } else if (key == "Capture date") {
            tokenMetadata.captureDate = isNumber
              ? value.toBigInt()
              : BigInt.fromString(stringValue);
          } else if (key == "Longitude") {
            tokenMetadata.longitude = BigDecimal.fromString(stringValue);
          } else if (key == "Latitude") {
            tokenMetadata.latitude = BigDecimal.fromString(stringValue);
          } else if (key == "Location Precision") {
            tokenMetadata.locationPrecision = stringValue;
          }
        }
      }
    }

    tokenMetadata.save();
  }
}
