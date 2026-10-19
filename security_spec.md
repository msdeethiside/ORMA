# Firestore Security Specification

## 1. Data Invariants
- The `site_content` collection stores the global site content mapping under the deterministic document ID `live`.
- Any document ID other than `live` is rejected to prevent arbitrary document pollution.
- Read operations (`get`) on `/site_content/live` are permitted publicly so that all visitors immediately see the latest live edits without requiring an account.
- List/query operations on `/site_content` are disallowed to avoid collection scraping.
- Deletions are strictly forbidden (`allow delete: if false;`).
- Writes (`create`, `update`) require:
  - Valid document ID (`live`).
  - Strict key enforcement: must have `content` and `updatedAt`, and allowed keys limited to `['content', 'updatedAt', 'updatedBy']`.
  - Type integrity: `content` must be a map, `updatedAt` must be a string <= 64 characters, `updatedBy` must be a string <= 100 characters.

## 2. The "Dirty Dozen" Threat Payloads
1. **Arbitrary Collection Write**: Attempting to write to `/unauthorized_collection/test` -> Blocked by default deny.
2. **Document ID Injection**: Writing to `/site_content/malicious_long_id_123` -> Blocked by `contentId == 'live'`.
3. **Shadow Field Attack**: Writing `{ content: {}, updatedAt: "...", hackerField: true }` -> Blocked by `.hasOnly()`.
4. **Missing Content Field**: Writing `{ updatedAt: "..." }` without `content` -> Blocked by `.hasAll()`.
5. **Non-Map Content Attack**: Writing `{ content: "not-a-map", updatedAt: "..." }` -> Blocked by `is map`.
6. **Collection Listing Attack**: Executing collection query `getDocs(collection(db, "site_content"))` -> Blocked by `allow list: if false;`.
7. **Document Deletion Attack**: Attempting `deleteDoc(doc(db, "site_content", "live"))` -> Blocked by `allow delete: if false;`.
8. **Oversized String in UpdatedBy**: Writing `{ updatedBy: "A".repeat(500) }` -> Blocked by `.size() <= 100`.
9. **Oversized Timestamp String**: Writing `{ updatedAt: "A".repeat(500) }` -> Blocked by `.size() <= 64`.
10. **Array Injection in Content**: Writing `{ content: [1, 2, 3] }` -> Blocked by `is map`.
11. **Subcollection Hijack**: Writing to `/site_content/live/subcollection/item` -> Blocked by default deny.
12. **Null/Undefined Content Injection**: Writing `{ content: null, updatedAt: "..." }` -> Blocked by `is map`.
