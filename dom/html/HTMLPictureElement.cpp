/* -*- Mode: C++; tab-width: 8; indent-tabs-mode: nil; c-basic-offset: 2 -*- */
/* vim: set ts=8 sts=2 et sw=2 tw=80: */
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

#include "mozilla/dom/HTMLPictureElement.h"
#include "mozilla/dom/HTMLPictureElementBinding.h"
#include "mozilla/dom/HTMLImageElement.h"

// Expand NS_IMPL_NS_NEW_HTML_ELEMENT(Picture) to add pref check.
nsGenericHTMLElement*
NS_NewHTMLPictureElement(already_AddRefed<mozilla::dom::NodeInfo>&& aNodeInfo,
                         mozilla::dom::FromParser aFromParser)
{
  return new mozilla::dom::HTMLPictureElement(std::move(aNodeInfo));
}

namespace mozilla {
namespace dom {

HTMLPictureElement::HTMLPictureElement(already_AddRefed<mozilla::dom::NodeInfo>&& aNodeInfo)
  : nsGenericHTMLElement(std::move(aNodeInfo))
{
}

HTMLPictureElement::~HTMLPictureElement()
{
}

NS_IMPL_ELEMENT_CLONE(HTMLPictureElement)

void
HTMLPictureElement::RemoveChildNode(nsIContent* aKid, bool aNotify)
{
  if (aKid && aKid->IsHTMLElement(nsGkAtoms::img)) {
    HTMLImageElement* img = HTMLImageElement::FromNode(aKid);
    if (img) {
      img->PictureSourceRemoved(aKid->AsContent());
    }
  } else if (aKid && aKid->IsHTMLElement(nsGkAtoms::source)) {
    // Find all img siblings after this <source> to notify them of its demise
    nsCOMPtr<nsIContent> nextSibling = aKid->GetNextSibling();
    if (nextSibling && nextSibling->GetParentNode() == this) {
      do {
        HTMLImageElement* img = HTMLImageElement::FromNode(nextSibling);
        if (img) {
          img->PictureSourceRemoved(aKid->AsContent());
        }
      } while ( (nextSibling = nextSibling->GetNextSibling()) );
    }
  }

  nsGenericHTMLElement::RemoveChildNode(aKid, aNotify);
}

nsresult
HTMLPictureElement::InsertChildBefore(nsIContent* aKid, nsIContent* aBeforeThis,
                                      bool aNotify)
{
  nsresult rv =
    nsGenericHTMLElement::InsertChildBefore(aKid, aBeforeThis, aNotify);

  NS_ENSURE_SUCCESS(rv, rv);
  NS_ENSURE_TRUE(aKid, rv);

  if (aKid->IsHTMLElement(nsGkAtoms::img)) {
    HTMLImageElement* img = HTMLImageElement::FromNode(aKid);
    if (img) {
      img->PictureSourceAdded(aKid->AsContent());
    }
  } else if (aKid->IsHTMLElement(nsGkAtoms::source)) {
    // Find all img siblings after this <source> to notify them of its insertion
    nsCOMPtr<nsIContent> nextSibling = aKid->GetNextSibling();
    if (nextSibling && nextSibling->GetParentNode() == this) {
      do {
        HTMLImageElement* img = HTMLImageElement::FromNode(nextSibling);
        if (img) {
          img->PictureSourceAdded(aKid->AsContent());
        }
      } while ( (nextSibling = nextSibling->GetNextSibling()) );
    }
  }

  return rv;
}

JSObject*
HTMLPictureElement::WrapNode(JSContext* aCx, JS::Handle<JSObject*> aGivenProto)
{
  return HTMLPictureElement_Binding::Wrap(aCx, this, aGivenProto);
}

} // namespace dom
} // namespace mozilla
