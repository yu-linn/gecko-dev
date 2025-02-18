/* -*- Mode: C++; tab-width: 8; indent-tabs-mode: nil; c-basic-offset: 4 -*-
 * vim: set ts=8 sts=4 et sw=4 tw=99:
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

#ifndef dom_NodeUbiReporting_h
#define dom_NodeUbiReporting_h

#include "nsINode.h"
#include "js/UbiNode.h"

/*
 * This file defines specializations of JS::ubi::Concrete for DOM nodes
 * so that the JS memory tools, which operate on the UbiNode graph, can
 * define subclasses of JS::ubi::Base that represent DOM nodes and
 * yield the outgoing edges in a DOM node graph for reporting.
*/

using mozilla::dom::Attr;

namespace JS {
namespace ubi {

// The DOM node base class.
// This is an abstract class and therefore does not require a concreteTypeName.
template<>
class Concrete<nsINode> : public Base
{
protected:
  explicit Concrete(nsINode *ptr) : Base(ptr) { }

public:
  static void construct(void *storage, nsINode *ptr);
  Size size(mozilla::MallocSizeOf mallocSizeOf) const override;
  js::UniquePtr<EdgeRange> edges(JSContext* cx, bool wantNames) const override;

  nsINode& get() const { return *static_cast<nsINode*>(ptr); }
  CoarseType coarseType() const final { return CoarseType::DOMNode; }
  const char16_t* descriptiveTypeName() const override;
};

template<>
class Concrete<nsIContent> : public Concrete<nsINode>
{
protected:
  explicit Concrete(nsIContent *ptr) : Concrete<nsINode>(ptr) { }

public:
  static void construct(void *storage, nsIContent *ptr) { new (storage) Concrete(ptr); }
  const char16_t* typeName() const override { return concreteTypeName; };
  static const char16_t concreteTypeName[];
};

template<>
class Concrete<nsIDocument> : public Concrete<nsINode>
{
protected:
  explicit Concrete(nsIDocument *ptr) : Concrete<nsINode>(ptr) { }

public:
  static void construct(void *storage, nsIDocument *ptr) { new (storage) Concrete(ptr); }
  Size size(mozilla::MallocSizeOf mallocSizeOf) const override;

  nsIDocument& getDoc() const { return *static_cast<nsIDocument*>(ptr); }
  const char16_t* typeName() const override { return concreteTypeName; };
  static const char16_t concreteTypeName[];
};

template<>
class Concrete<Attr> : public Concrete<nsINode>
{
protected:
  explicit Concrete(Attr *ptr) : Concrete<nsINode>(ptr) { }

public:
  static void construct(void *storage, Attr *ptr) { new (storage) Concrete(ptr); }
  const char16_t* typeName() const override { return concreteTypeName; };
  static const char16_t concreteTypeName[];
};

} //namespace ubi
} //namespace JS

#endif
