import { json, Bytes, dataSource, BigInt, BigDecimal } from "@graphprotocol/graph-ts";
import { TokenMetadata } from "../generated/schema";

const keysMapping = {
  application: "Application",
  channel: "Channel",
  contentType: "Content Type",
  duration: "Duration (sec)",
  captureDate: "Capture date",
  longitude: "Longtitude",
  latitude: "Latitude",
  locationPrecision: "Location Precision",
};

function convertArrayToObject(arr: any[]) {
  // validate array
  if (!Array.isArray(arr)) return null;

  return arr.reduce((acc: { [key: string]: any }, nonObject) => {
    const obj = nonObject.toObject();
    const trait_type = obj.get("trait_type").toString();
    const value = obj.get("value").toString();
    acc[trait_type] = value;
    return acc;
  }, {});
}

export function handleMetadata(content: Bytes): void {
  let tokenMetadata = new TokenMetadata(dataSource.stringParam());
  const value = json.fromBytes(content).toObject();
  if (value) {
    const image = value.get("image");
    const content = value.get("content");
    const name = value.get("name");
    const description = value.get("description");
    const channel = value.get("channel");
    const contentType = value.get("contentType");
    const contentHash = value.get("content_hash");
    const attributes = value.get("attributes");
    const thumbnail = value.get("thumbnail");

    tokenMetadata.content = image ? image.toString() : content ? content.toString() : "";
    tokenMetadata.name = name ? name.toString() : "";
    tokenMetadata.description = description ? description.toString() : "";
    tokenMetadata.channel = channel ? channel.toString() : "";
    tokenMetadata.contentType = contentType ? contentType.toString() : "";
    tokenMetadata.contentHash = contentHash ? contentHash.toString() : "";
    tokenMetadata.thumbnail = thumbnail ? thumbnail.toString() : "";

    const attributesArray = attributes?.toArray();
    // new metadata from attributes
    if (attributesArray && attributesArray.length > 0) {
      const objectAttributes = convertArrayToObject(attributesArray);

      if (objectAttributes) {
        tokenMetadata.application = objectAttributes[keysMapping.application];
        tokenMetadata.channel = objectAttributes[keysMapping.channel];
        tokenMetadata.contentType = objectAttributes[keysMapping.contentType];
        tokenMetadata.duration = objectAttributes[keysMapping.duration] || 0;
        tokenMetadata.captureDate = objectAttributes[keysMapping.captureDate]
          ? BigInt.fromString(objectAttributes[keysMapping.captureDate])
          : BigInt.fromI32(0);
        tokenMetadata.longitude = objectAttributes[keysMapping.longitude]
          ? BigDecimal.fromString(objectAttributes[keysMapping.longitude])
          : null;
        tokenMetadata.latitude = objectAttributes[keysMapping.latitude]
          ? BigDecimal.fromString(objectAttributes[keysMapping.latitude])
          : null;
        tokenMetadata.locationPrecision =
          objectAttributes[keysMapping.locationPrecision];
      }
    }

    tokenMetadata.save();
  }
}
