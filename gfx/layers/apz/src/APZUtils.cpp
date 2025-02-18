/* -*- Mode: C++; tab-width: 8; indent-tabs-mode: nil; c-basic-offset: 2 -*- */
/* vim: set ts=8 sts=2 et sw=2 tw=80: */
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

#include "mozilla/layers/APZUtils.h"

#include "AsyncPanZoomController.h"

namespace mozilla {
namespace layers {

AutoApplyAsyncTestAttributes::AutoApplyAsyncTestAttributes(AsyncPanZoomController* aApzc)
  : mApzc(aApzc)
  , mPrevFrameMetrics(aApzc->Metrics())
{
  mApzc->ApplyAsyncTestAttributes();
}

AutoApplyAsyncTestAttributes::~AutoApplyAsyncTestAttributes()
{
  mApzc->UnapplyAsyncTestAttributes(mPrevFrameMetrics);
}

namespace apz {

/*static*/ void
InitializeGlobalState()
{
  MOZ_ASSERT(NS_IsMainThread());
  AsyncPanZoomController::InitializeGlobalState();
}

/*static*/ const ScreenMargin
CalculatePendingDisplayPort(const FrameMetrics& aFrameMetrics,
                            const ParentLayerPoint& aVelocity)
{
  return AsyncPanZoomController::CalculatePendingDisplayPort(
      aFrameMetrics, aVelocity);
}

} // namespace apz
} // namespace layers
} // namespace mozilla
