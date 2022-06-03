<?php

namespace App\Http\Resources;

use App\Models\Message;
use Illuminate\Http\Resources\Json\JsonResource;

class UserChatResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $to_user = $this;
        $message =   Message::where(function ($w) use ($to_user) {
            $w->whereUserId(user('id'))->whereTo($to_user->id);
        })->orWhere(function ($w) use ($to_user) {
            $w->whereUserId($to_user->id)->whereTo(user('id'));
        })->latest()->first();
        return array_merge(parent::toArray($request), [
            "thumbnail" => $this->takeThumbnail,
            "message" =>   new UserChatMessageResource($message)
        ]);
    }
}
