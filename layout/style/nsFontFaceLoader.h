/* -*- Mode: C++; tab-width: 8; indent-tabs-mode: nil; c-basic-offset: 2 -*- */
/* vim: set ts=8 sts=2 et sw=2 tw=80: */
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* code for loading in @font-face defined font data */

#ifndef nsFontFaceLoader_h_
#define nsFontFaceLoader_h_

#include "mozilla/Attributes.h"
#include "mozilla/TimeStamp.h"
#include "mozilla/dom/FontFaceSet.h"
#include "nsCOMPtr.h"
#include "nsIStreamLoader.h"
#include "nsIChannel.h"
#include "nsIRequestObserver.h"
#include "gfxUserFontSet.h"
#include "nsHashKeys.h"
#include "nsTHashtable.h"

class nsIPrincipal;

class nsFontFaceLoader final : public nsIStreamLoaderObserver
                             , public nsIRequestObserver
{
public:
  nsFontFaceLoader(gfxUserFontEntry* aFontToLoad, nsIURI* aFontURI,
                   mozilla::dom::FontFaceSet* aFontFaceSet,
                   nsIChannel* aChannel);

  NS_DECL_ISUPPORTS
  NS_DECL_NSISTREAMLOADEROBSERVER
  NS_DECL_NSIREQUESTOBSERVER

  // initiate the load
  nsresult Init();
  // cancel the load and remove its reference to mFontFaceSet
  void Cancel();

  void DropChannel() { mChannel = nullptr; }

  void StartedLoading(nsIStreamLoader* aStreamLoader);

  static void LoadTimerCallback(nsITimer* aTimer, void* aClosure);

  gfxUserFontEntry* GetUserFontEntry() const { return mUserFontEntry; }

protected:
  virtual ~nsFontFaceLoader();

  // helper method for determining the font-display value
  mozilla::StyleFontDisplay GetFontDisplay();

private:
  RefPtr<gfxUserFontEntry>  mUserFontEntry;
  nsCOMPtr<nsIURI>        mFontURI;
  RefPtr<mozilla::dom::FontFaceSet> mFontFaceSet;
  nsCOMPtr<nsIChannel>    mChannel;
  nsCOMPtr<nsITimer>      mLoadTimer;
  mozilla::TimeStamp      mStartTime;
  nsIStreamLoader*        mStreamLoader;
};

#endif /* !defined(nsFontFaceLoader_h_) */
